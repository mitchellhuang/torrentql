import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { User } from '@torrentql/common/dist/entities/User';
import { BillingActivity } from '@torrentql/common/dist/entities/BillingActivity';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DISK_USAGE_GB_SECOND_COST = DISK_USAGE_GB_MONTH_COST / 30 / 86400;
const DATA_TRANSFER_IN_GB_COST = 0.01;
const DATA_TRANSFER_OUT_GB_COST = 0.01;
const DATA_TRANSFER_IN_BYTES_COST = DATA_TRANSFER_IN_GB_COST / 1e9;
const DATA_TRANSFER_OUT_BYTES_COST = DATA_TRANSFER_OUT_GB_COST / 1e9;

interface TorrentUsage {
  diskUsage: number;
  dataTransferIn: number;
  dataTransferOut: number;
}

const run = async () => {
  console.log('Starting billing daemon...');

  const cache = new Map<string, TorrentUsage>();
  const connection = await createConnectionFromEnv();

  const writeBillingActivity = async () => {
    const torrents = await connection
      .getRepository(Torrent)
      .createQueryBuilder('torrent')
      .where('is_active = true')
      .leftJoinAndSelect('torrent.user', 'user')
      .leftJoinAndSelect('torrent.server', 'server')
      .getMany();

    if (!torrents.length) {
      return;
    }

    let torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));
    torrentsWithDeluge = torrentsWithDeluge.filter(torrent => torrent !== null);

    let values = await Promise.all(
      (torrentsWithDeluge as Torrent[]).map(async (torrent) => {
        const cached = cache.get(torrent.id);
        if (cached) {
          if (cached.diskUsage === torrent.totalSize &&
              cached.dataTransferIn === torrent.totalDownloaded &&
              cached.dataTransferOut === torrent.totalUploaded) {
            return null;
          }
        }
        cache.set(torrent.id, {
          diskUsage: torrent.totalSize,
          dataTransferIn: torrent.totalDownloaded,
          dataTransferOut: torrent.totalUploaded,
        });
        return {
          diskUsage: torrent.totalSize,
          dataTransferIn: torrent.totalDownloaded,
          dataTransferOut: torrent.totalUploaded,
          torrent,
          user: await torrent.user,
        };
      }),
    );

    values = values.filter(ba => ba !== null);

    if (values.length) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(BillingActivity)
        .values(values as any)
        .execute();
    }
  };

  const writeBillingHistory = async () => {
    const endAt = new Date();
    const beginAt = new Date();
    beginAt.setHours(endAt.getHours() - 1);

    interface UsageByUser {
      user_id: string;
      begin_at: Date;
      end_at: Date;
      disk_usage: number;
      data_transfer_in: number;
      data_transfer_out: number;
    }

    const usageByUser: UsageByUser[] = await connection
      .createEntityManager()
      .query(`
        WITH per_torrent AS (
          SELECT DISTINCT ON (t1.torrent_id)
              t1.torrent_id,
              t1.user_id,
              t1.disk_usage,
              CURRENT_TIMESTAMP as begin_at,
              CURRENT_TIMESTAMP - interval '1 hour' as end_at,
              MAX(t2.data_transfer_in) - MIN(t2.data_transfer_in) AS data_transfer_in,
              MAX(t2.data_transfer_out) - MIN(t2.data_transfer_out) AS data_transfer_out
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
            begin_at,
            end_at,
            SUM(disk_usage) disk_usage,
            SUM(data_transfer_in) data_transfer_in,
            SUM(data_transfer_out) data_transfer_out
            FROM per_torrent
          GROUP BY
            user_id,
            begin_at,
            end_at
      `);

    await connection.transaction(async (transaction) => {
      await Promise.all(
        usageByUser.map((user) => {
          const totalCost = user.data_transfer_in * DATA_TRANSFER_IN_BYTES_COST +
                            user.data_transfer_out * DATA_TRANSFER_OUT_BYTES_COST;
          if (totalCost > 0) {
            const tmpUser = new User();
            tmpUser.id = user.user_id;
            return transaction.createQueryBuilder().insert().into(BillingHistory).values({
              totalCost,
              beginAt: user.begin_at,
              endAt: user.end_at,
              user: Promise.resolve(tmpUser),
            }).execute();
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
