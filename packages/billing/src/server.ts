import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { BillingActivity } from '@torrentql/common/dist/entities/BillingActivity';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DISK_USAGE_GB_SECOND_COST = DISK_USAGE_GB_MONTH_COST / 30 / 86400;
// const DATA_TRANSFER_IN_GB_COST = 0.00;
// const DATA_TRANSFER_OUT_GB_COST = 0.01;

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

    let values = (torrentsWithDeluge as Torrent[]).map((torrent) => {
      const cachedTorrentUsage = cache.get(torrent.id);
      if (cachedTorrentUsage) {
        if (cachedTorrentUsage.diskUsage === torrent.totalSize &&
            cachedTorrentUsage.dataTransferIn === torrent.totalDownloaded &&
            cachedTorrentUsage.dataTransferOut === torrent.totalUploaded) {
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
        user: torrent.user,
      };
    });

    values = values.filter(ba => ba !== null);

    await connection
      .createQueryBuilder()
      .insert()
      .into(BillingActivity)
      .values(values as any)
      .execute();
  };

  const writeBillingHistory = async () => {
    const endAt = new Date();
    const beginAt = new Date();
    beginAt.setHours(endAt.getHours() - 1);

    const billingActivities = await connection
      .getRepository(BillingActivity)
      .createQueryBuilder('billing_activity')
      .select('torrent_id, SUM(data_transfer_out) as data_transfer_out')
      .where('created_at >= :beginAt', { beginAt })
      .andWhere('created_at < :endAt', { endAt })
      .groupBy('torrent_id')
      .getSql();

    console.log(billingActivities);

    // await connection.transaction<void>((transaction) => {
    //   torrentsWithDeluge.forEach(async (torrent) => {
    //     if (torrent) {
    //       console.log('Writing billing history for torrent', torrent.id);
    //       const billingHistory = new BillingActivity();
    //       billingHistory.diskUsageBytes = torrent.totalSize;
    //       billingHistory.diskUsageSeconds = 60;
    //       billingHistory.diskUsageCost = DISK_USAGE_GB_MONTH_COST;
    //       billingHistory.dataTransferOut = torrent.totalUploaded;
    //       billingHistory.dataTransferCost = DATA_TRANSFER_OUT_GB_COST;
    //       billingHistory.torrent = Promise.resolve(torrent);
    //       billingHistory.user = torrent.user;
    //       await transaction
    //         .getRepository(BillingActivity)
    //         .save(billingHistory);
    //     }
    //   });
    //   return Promise.resolve();
    // });
  };

  // writeBillingHistory();

  // writeBillingActivity();

  setInterval(writeBillingActivity, 5 * 1000);

  // setInterval(writeBillingHistory, 5 * 1000);
};

run();
