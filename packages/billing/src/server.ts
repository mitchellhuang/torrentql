import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';

const DISK_USAGE_GB_MONTH_COST = 0.01;
const DATA_TRANSFER_OUT_GB_COST = 0.01;

const createServer = async () => {
  const connection = await createConnectionFromEnv();
  const torrents = await connection
    .getRepository(Torrent)
    .createQueryBuilder('torrent')
    .where('torrent.is_active = true')
    .getMany();

  const torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));

  const writeBillingHistory = async () => {
    await connection.transaction(trx => {
      torrentsWithDeluge.forEach(async (torrent) => {
        if (torrent) {
          console.log('Writing billing history for torrent', torrent.id);
          const billingHistory = new BillingHistory();
          billingHistory.diskUsageBytes = torrent.totalSize;
          billingHistory.diskUsageSeconds = 60;
          billingHistory.diskUsageCost = DISK_USAGE_GB_MONTH_COST;
          billingHistory.dataTransferOut = torrent.totalUploaded;
          billingHistory.dataTransferCost = DATA_TRANSFER_OUT_GB_COST;
          billingHistory.torrent = Promise.resolve(torrent);
          billingHistory.user = torrent.user;
          await trx
            .getRepository(BillingHistory)
            .save(billingHistory);
        }
      });
    });
  };

  setInterval(writeBillingHistory, 60 * 1000);
};

createServer();
