import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
// import { User } from '@torrentql/common/dist/entities/User';
import { BillingUsage } from '@torrentql/common/dist/entities/BillingUsage';
// import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

// const DISK_USAGE_GB_MONTH_PRICE = 0.01;
// const DISK_USAGE_GB_SECOND_PRICE = DISK_USAGE_GB_MONTH_PRICE / 30 / 86400;
// const DISK_USAGE_BYTE_SECONDS_PRICE = DISK_USAGE_GB_SECOND_PRICE / 1e9;
// const DATA_TRANSFER_IN_GB_PRICE = 0.01;
// const DATA_TRANSFER_OUT_GB_PRICE = 0.01;
// const DATA_TRANSFER_IN_BYTES_PRICE = DATA_TRANSFER_IN_GB_PRICE / 1e9;
// const DATA_TRANSFER_OUT_BYTES_PRICE = DATA_TRANSFER_OUT_GB_PRICE / 1e9;

interface Usage {
  diskUsage: number;
  dataTransferIn: number;
  dataTransferOut: number;
}

// interface History {
//   cost: number;
//   diskUsage: number;
//   diskUsagePrice: number;
//   diskUsageCost: number;
//   dataTransferIn: number;
//   dataTransferInPrice: number;
//   dataTransferInCost: number;
//   dataTransferOut: number;
//   dataTransferOutPrice: number;
//   dataTransferOutCost: number;
//   beginAt: Date;
//   endAt: Date;
// }

// interface UsageByUser {
//   user_id: string;
//   begin_at: Date;
//   end_at: Date;
//   disk_usage_byte_seconds: number;
//   data_transfer_in: number;
//   data_transfer_out: number;
// }

const run = async () => {
  console.log('Starting billing daemon...');

  const cache = new Map<string, Usage>();
  const connection = await createConnectionFromEnv();

  const writeBillingUsage = async () => {
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
          const usage: Usage = {
            diskUsage: torrent.totalSize,
            dataTransferIn: torrent.totalDownloaded,
            dataTransferOut: torrent.totalUploaded,
          };
          const cached = cache.get(torrent.id);
          if (cached &&
              cached.diskUsage === usage.diskUsage &&
              cached.dataTransferIn === usage.dataTransferIn &&
              cached.dataTransferOut === usage.dataTransferOut) {
            return Promise.resolve(undefined);
          }
          cache.set(torrent.id, usage);
          return transaction.createQueryBuilder()
            .insert()
            .into(BillingUsage)
            .values({
              ...usage,
              torrent: await torrent as any,
              user: await torrent.user as any,
            })
            .execute();
        }),
      );
    });
  };

  const writeBillingHistory = async() => {
    const endAt = new Date();
    const beginAt = new Date();
    beginAt.setHours(endAt.getHours() - 1);

    await connection.transaction(async (transaction) => {
      const torrents = await transaction
        .getRepository(Torrent)
        .createQueryBuilder('torrent')
        .where('is_active = true')
        .leftJoinAndSelect('torrent.user', 'user')
        .leftJoinAndSelect('torrent.server', 'server')
        .getMany();

      const counts = await Promise.all(
        torrents.map((torrent) => {
          return transaction
            .getRepository(BillingUsage)
            .createQueryBuilder('billing_usage')
            .where('torrent_id = :id', { id: torrent.id })
            .andWhere('created_at >= :beginAt', { beginAt })
            .andWhere('created_at < :endAt', { endAt })
            .getCount();
        }),
      );

      const torrentsWithZero: Torrent[] = [];
      counts.forEach((count, i) => {
        if (count === 0) {
          torrentsWithZero.push(torrents[i]);
        }
      });

      let torrentsWithZeroWithDeluge = await Promise.all(torrentsWithZero.map(mapDelugeToTorrent));
      torrentsWithZeroWithDeluge = torrentsWithZeroWithDeluge.filter(torrent => torrent !== null);

      const torrentsFinal = await Promise.all(
        torrentsWithZero.map(async torrent => ({
          id: torrent.id,
          userId: (await torrent.user).id,
          diskUsage: torrent.totalSize,
        })),
      );

      const idleDiskUsageByUser: { [key: string]: number } = {};
      torrentsFinal.forEach((torrent) => {
        const { userId } = torrent;
        if (idleDiskUsageByUser[userId]) {
          idleDiskUsageByUser[userId] = idleDiskUsageByUser[userId] + torrent.diskUsage;
        } else {
          idleDiskUsageByUser[userId] = torrent.diskUsage;
        }
      });

      console.log(idleDiskUsageByUser);

      // console.log(diskUsageByUser);
      // const billingUsage = await transaction
      //   .getRepository(BillingUsage)
      //   .createQueryBuilder('billing_usage')
      //   .where('created_at >= :beginAt', { beginAt })
      //   .andWhere('created_at < :endAt', { endAt })
      //   .orderBy('created_at', 'ASC')
      //   .addOrderBy('torrent_id', 'ASC')
      //   .getRawMany();

      // console.log(billingUsage);
    });
  };

  // const writeBillingHistory = async () => {
  //   await writeBillingUsage();

  //   const usageByUser: UsageByUser[] = await connection
  //     .query(`
  //       WITH per_torrent AS (
  //         SELECT DISTINCT ON (t1.torrent_id)
  //             t1.torrent_id,
  //             t1.user_id,
  //             CEIL(
  //               EXTRACT(EPOCH FROM (MAX(t1.created_at) - MIN(t1.created_at))) * t1.disk_usage
  //             ) AS disk_usage_byte_seconds,
  //             MAX(t1.data_transfer_in) - MIN(t1.data_transfer_in) AS data_transfer_in,
  //             MAX(t1.data_transfer_out) - MIN(t1.data_transfer_out) AS data_transfer_out,
  //             CURRENT_TIMESTAMP as begin_at,
  //             CURRENT_TIMESTAMP - interval '1 hour' as end_at
  //         FROM
  //             billing_usage AS t1,
  //             billing_usage AS t2
  //         WHERE
  //             t1.torrent_id = t2.torrent_id
  //             AND t1.created_at <= CURRENT_TIMESTAMP
  //             AND t1.created_at >= CURRENT_TIMESTAMP - interval '1 hour'
  //         GROUP BY
  //             t1.disk_usage,
  //             t1.torrent_id,
  //             t1.user_id
  //       ) SELECT
  //           user_id,
  //           SUM(disk_usage_byte_seconds) disk_usage_byte_seconds,
  //           SUM(data_transfer_in) data_transfer_in,
  //           SUM(data_transfer_out) data_transfer_out,
  //           begin_at,
  //           end_at
  //           FROM per_torrent
  //         GROUP BY
  //           user_id,
  //           begin_at,
  //           end_at
  //     `);

  //   await connection.transaction(async (transaction) => {
  //     await Promise.all(
  //       usageByUser.map((usage) => {
  //         const diskUsageCost = usage.disk_usage_byte_seconds * DISK_USAGE_BYTE_SECONDS_PRICE;
  //         const dataTransferInCost = usage.data_transfer_in * DATA_TRANSFER_IN_BYTES_PRICE;
  //         const dataTransferOutCost = usage.data_transfer_out * DATA_TRANSFER_OUT_BYTES_PRICE;
  //         const cost = diskUsageCost + dataTransferInCost + dataTransferOutCost;
  //         if (cost <= 0) {
  //           return Promise.resolve(undefined);
  //         }
  //         const history: History = {
  //           cost,
  //           diskUsage: usage.disk_usage_byte_seconds,
  //           diskUsagePrice: DISK_USAGE_GB_MONTH_PRICE,
  //           diskUsageCost,
  //           dataTransferIn: usage.data_transfer_in,
  //           dataTransferInPrice: DATA_TRANSFER_IN_GB_PRICE,
  //           dataTransferInCost,
  //           dataTransferOut: usage.data_transfer_out,
  //           dataTransferOutPrice: DATA_TRANSFER_OUT_GB_PRICE,
  //           dataTransferOutCost,
  //           beginAt: usage.begin_at,
  //           endAt: usage.end_at,
  //         };
  //         const user = new User();
  //         user.id = usage.user_id;
  //         const insert = transaction
  //           .createQueryBuilder()
  //           .insert()
  //           .into(BillingHistory)
  //           .values({
  //             ...history,
  //             user: user as any,
  //           })
  //           .execute();
  //         const update = transaction
  //           .query(
  //             'UPDATE users SET balance = balance - $1 WHERE id = $2',
  //             [history.cost, user.id],
  //           );
  //         return Promise.all([insert, update]);
  //       }),
  //     );
  //   });
  // };

  // writeBillingUsage();
  writeBillingHistory();

  // setInterval(writeBillingUsage, 1 * 1000);
  // setInterval(writeBillingHistory, 60 * 1000);
};

run();
