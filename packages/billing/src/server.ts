import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { User } from '@torrentql/common/dist/entities/User';
import { BillingActivity } from '@torrentql/common/dist/entities/BillingActivity';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DISK_USAGE_GB_SECOND_COST = DISK_USAGE_GB_MONTH_COST / 30 / 86400;
const DISK_USAGE_BYTE_SECONDS_COST = DISK_USAGE_GB_SECOND_COST / 1e9;
const DATA_TRANSFER_IN_GB_COST = 0.01;
const DATA_TRANSFER_OUT_GB_COST = 0.01;
const DATA_TRANSFER_IN_BYTES_COST = DATA_TRANSFER_IN_GB_COST / 1e9;
const DATA_TRANSFER_OUT_BYTES_COST = DATA_TRANSFER_OUT_GB_COST / 1e9;

interface Usage {
  diskUsage: number;
  dataTransferIn: number;
  dataTransferOut: number;
}

interface History {
  totalCost: number;
  beginAt: Date;
  endAt: Date;
}

interface UsageByUser {
  user_id: string;
  begin_at: Date;
  end_at: Date;
  disk_usage_byte_seconds: number;
  data_transfer_in: number;
  data_transfer_out: number;
}

const run = async () => {
  console.log('Starting billing daemon...');

  const cache = new Map<string, Usage>();
  const connection = await createConnectionFromEnv();

  const writeBillingActivity = async () => {
    const torrents = await connection
      .getRepository(Torrent)
      .createQueryBuilder('torrent')
      .where('is_active = true')
      .leftJoinAndSelect('torrent.user', 'user')
      .leftJoinAndSelect('torrent.server', 'server')
      .getMany();

    let torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));
    torrentsWithDeluge = torrentsWithDeluge.filter(torrent => torrent !== null);

    await connection.transaction(async (transaction) => {
      await Promise.all(
        (torrentsWithDeluge as Torrent[]).map(async (torrent) => {
          const cached = cache.get(torrent.id);
          const usage: Usage = {
            diskUsage: torrent.totalSize,
            dataTransferIn: torrent.totalDownloaded,
            dataTransferOut: torrent.totalUploaded,
          };
          if (cached) {
            if (cached.diskUsage === usage.diskUsage &&
                cached.dataTransferIn === usage.dataTransferIn &&
                cached.dataTransferOut === usage.dataTransferOut) {
              return Promise.resolve(undefined);
            }
          }
          cache.set(torrent.id, usage);
          return transaction.createQueryBuilder()
            .insert()
            .into(BillingActivity)
            .values({
              ...usage,
              torrent: await torrent,
              user: await torrent.user,
            } as any)
            .execute();
        }),
      );
    });
  };

  const writeBillingHistory = async () => {
    const usageByUser: UsageByUser[] = await connection
      .query(`
        WITH per_torrent AS (
          SELECT DISTINCT ON (t1.torrent_id)
              t1.torrent_id,
              t1.user_id,
              CEIL(
                EXTRACT(EPOCH FROM (MAX(t2.created_at) - MIN(t2.created_at))) * t1.disk_usage
              ) AS disk_usage_byte_seconds,
              MAX(t2.data_transfer_in) - MIN(t2.data_transfer_in) AS data_transfer_in,
              MAX(t2.data_transfer_out) - MIN(t2.data_transfer_out) AS data_transfer_out,
              CURRENT_TIMESTAMP as begin_at,
              CURRENT_TIMESTAMP - interval '1 hour' as end_at
          FROM
              billing_activity AS t1,
              billing_activity AS t2
          WHERE
              t1.torrent_id = t2.torrent_id
              AND t1.created_at <= CURRENT_TIMESTAMP
              AND t1.created_at >= CURRENT_TIMESTAMP - interval '1 hour'
          GROUP BY
              t1.disk_usage,
              t1.torrent_id,
              t1.user_id
        ) SELECT
            user_id,
            SUM(disk_usage_byte_seconds) disk_usage_byte_seconds,
            SUM(data_transfer_in) data_transfer_in,
            SUM(data_transfer_out) data_transfer_out,
            begin_at,
            end_at
            FROM per_torrent
          GROUP BY
            user_id,
            begin_at,
            end_at
      `);

    await connection.transaction(async (transaction) => {
      await Promise.all(
        usageByUser.map((usage) => {
          const totalCost = usage.disk_usage_byte_seconds * DISK_USAGE_BYTE_SECONDS_COST +
                            usage.data_transfer_in * DATA_TRANSFER_IN_BYTES_COST +
                            usage.data_transfer_out * DATA_TRANSFER_OUT_BYTES_COST;
          if (totalCost > 0) {
            const history: History = {
              totalCost,
              beginAt: usage.begin_at,
              endAt: usage.end_at,
            };
            const user = new User();
            user.id = usage.user_id;
            const insert = transaction
              .createQueryBuilder()
              .insert()
              .into(BillingHistory)
              .values({
                ...history,
                user,
              } as any)
              .execute();
            const update = transaction
              .query(
                'UPDATE users SET balance = balance - $1 WHERE id = $2',
                [history.totalCost, user.id],
              );
            return Promise.all([insert, update]);
          }
          return Promise.resolve(undefined);
        }),
      );
    });
  };

  // writeBillingActivity();

  // writeBillingHistory();

  setInterval(writeBillingActivity, 1 * 1000);

  setInterval(writeBillingHistory, 60 * 1000);
};

run();
