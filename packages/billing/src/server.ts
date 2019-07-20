import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { BillingActivity } from '@torrentql/common/dist/entities/BillingActivity';
// import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DATA_TRANSFER_OUT_GB_COST = 0.01;

const createServer = async () => {
  const connection = await createConnectionFromEnv();

  const writeBillingActivity = async () => {
    const torrents = await connection
      .getRepository(Torrent)
      .createQueryBuilder('torrent')
      .where('torrent.is_active = true')
      .getMany();

    const torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));

    await connection.transaction<void>((transaction) => {
      torrentsWithDeluge.forEach(async (torrent) => {
        if (torrent) {
          console.log('Writing billing history for torrent', torrent.id);
          const billingHistory = new BillingActivity();
          billingHistory.diskUsageBytes = torrent.totalSize;
          billingHistory.diskUsageSeconds = 60;
          billingHistory.diskUsageCost = DISK_USAGE_GB_MONTH_COST;
          billingHistory.dataTransferOut = torrent.totalUploaded;
          billingHistory.dataTransferCost = DATA_TRANSFER_OUT_GB_COST;
          billingHistory.torrent = Promise.resolve(torrent);
          billingHistory.user = torrent.user;
          await transaction
            .getRepository(BillingActivity)
            .save(billingHistory);
        }
      });
      return Promise.resolve();
    });
  };

  // const writeBillingHistory = async () => {
  //   const billingActivities = await connection
  //     .getRepository(BillingActivity)
  //     .createQueryBuilder('billing_activity')
  //     .where('created_at')

  //   await connection.transaction<void>((transaction) => {
  //     torrentsWithDeluge.forEach(async (torrent) => {
  //       if (torrent) {
  //         console.log('Writing billing history for torrent', torrent.id);
  //         const billingHistory = new BillingActivity();
  //         billingHistory.diskUsageBytes = torrent.totalSize;
  //         billingHistory.diskUsageSeconds = 60;
  //         billingHistory.diskUsageCost = DISK_USAGE_GB_MONTH_COST;
  //         billingHistory.dataTransferOut = torrent.totalUploaded;
  //         billingHistory.dataTransferCost = DATA_TRANSFER_OUT_GB_COST;
  //         billingHistory.torrent = Promise.resolve(torrent);
  //         billingHistory.user = torrent.user;
  //         await transaction
  //           .getRepository(BillingActivity)
  //           .save(billingHistory);
  //       }
  //     });
  //     return Promise.resolve();
  //   });
  // }

  setInterval(writeBillingActivity, 10 * 1000);

  // setInterval(writeBillingHistory, 60 * 1000);
};

createServer();
