import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { BillingActivity } from '@torrentql/common/dist/entities/BillingActivity';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DATA_TRANSFER_OUT_GB_COST = 0.01;

const createServer = async () => {
  const connection = await createConnectionFromEnv();

  const writeBillingActivity = async () => {
    let torrents = await connection
      .getRepository(Torrent)
      .createQueryBuilder('torrent')
      .where('is_active = true')
      .getMany();

    torrents = await Promise.all(
      torrents.map(async (torrent) => {
        const user = await torrent.user;
        torrent.user = Promise.resolve(user);
        return torrent;
      }),
    );

    if (!torrents.length) {
      return;
    }

    let torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));
    torrentsWithDeluge = torrentsWithDeluge.filter(torrent => torrent !== null);

    await connection.transaction<void>(async (transaction) => {
      await Promise.all((torrentsWithDeluge as Torrent[]).map((torrent) => {
        const billingActivity = new BillingActivity();
        billingActivity.diskUsageBytes = torrent.totalSize;
        billingActivity.diskUsageSeconds = 60;
        billingActivity.diskUsageCost = DISK_USAGE_GB_MONTH_COST;
        billingActivity.dataTransferOut = torrent.totalUploaded;
        billingActivity.dataTransferCost = DATA_TRANSFER_OUT_GB_COST;
        billingActivity.torrent = Promise.resolve(torrent);
        billingActivity.user = Promise.resolve(torrent.user);
        return transaction
          .getRepository(BillingActivity)
          .save(billingActivity);
      }));
    });
  };

  const writeBillingHistory = async () => {
    const endAt = new Date();
    const beginAt = new Date();
    beginAt.setHours(endAt.getHours() - 1);

    console.log(beginAt);
    console.log(endAt);

    const billingActivities = await connection
      .getRepository(BillingActivity)
      .createQueryBuilder('billing_activity')
      .select('SUM(disk_usage_bytes)')
      .where('created_at >= :beginAt', { beginAt })
      .andWhere('created_at < :endAt', { endAt })
      .groupBy('user_id')
      .getRawMany();

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

  writeBillingHistory();

  // setInterval(writeBillingActivity, 5 * 1000);

  // setInterval(writeBillingHistory, 5 * 1000);
};

createServer();
