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
  };

  // writeBillingHistory();

  // writeBillingActivity();

  setInterval(writeBillingActivity, 1 * 1000);

  // setInterval(writeBillingHistory, 5 * 1000);
};

run();
