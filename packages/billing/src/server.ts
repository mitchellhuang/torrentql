import 'dotenv/config';
import { EntityManager } from 'typeorm';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import { User } from '@torrentql/common/dist/entities/User';
import { BillingUsage } from '@torrentql/common/dist/entities/BillingUsage';
import { BillingPeriod } from '@torrentql/common/dist/entities/BillingPeriod';
import { BillingHistory } from '@torrentql/common/dist/entities/BillingHistory';

const DISK_USAGE_GB_MONTH_PRICE = 0.01;
const DISK_USAGE_GB_SECOND_PRICE = DISK_USAGE_GB_MONTH_PRICE / 30 / 86400;
const DISK_USAGE_BYTE_SECONDS_PRICE = DISK_USAGE_GB_SECOND_PRICE / 1e9;
const DATA_TRANSFER_IN_GB_PRICE = 0.00;
const DATA_TRANSFER_OUT_GB_PRICE = 0.01;
const DATA_TRANSFER_IN_BYTES_PRICE = DATA_TRANSFER_IN_GB_PRICE / 1e9;
const DATA_TRANSFER_OUT_BYTES_PRICE = DATA_TRANSFER_OUT_GB_PRICE / 1e9;

interface Usage {
  diskUsage: number;
  dataTransferIn: number;
  dataTransferOut: number;
}

interface History {
  cost: number;
  diskUsageByteSeconds: number;
  diskUsagePrice: number;
  diskUsageCost: number;
  dataTransferIn: number;
  dataTransferInPrice: number;
  dataTransferInCost: number;
  dataTransferOut: number;
  dataTransferOutPrice: number;
  dataTransferOutCost: number;
  beginAt: Date;
  endAt: Date;
}

interface UsageByUser {
  userId: string;
  balance: number;
  diskUsageByteSeconds: number;
  dataTransferIn: number;
  dataTransferOut: number;
  beginAt: Date;
  endAt: Date;
}

interface Cost {
  cost: number;
  diskUsageCost: number;
  dataTransferInCost: number;
  dataTransferOutCost: number;
}

const getUsageByUser = (transaction: EntityManager): Promise<UsageByUser[]> => transaction
  .getRepository(BillingPeriod)
  .createQueryBuilder('billing_period')
  .select(`
    user_id as "userId",
    SUM(disk_usage_byte_seconds) - SUM(disk_usage_byte_seconds_billed) AS "diskUsageByteSeconds",
    SUM(data_transfer_in) - SUM(data_transfer_in_billed) AS "dataTransferIn",
    SUM(data_transfer_out) - SUM(data_transfer_out_billed) AS "dataTransferOut",
    CURRENT_TIMESTAMP as "beginAt",
    CURRENT_TIMESTAMP - interval '24 hour' as "endAt"
  `)
  .addSelect('user.balance as "balance"')
  .groupBy('billing_period.user_id')
  .addGroupBy('user.id')
  .leftJoin('billing_period.user', 'user')
  .getRawMany();

const getCost = (usage: UsageByUser): Cost => {
  const diskUsageCost = usage.diskUsageByteSeconds * DISK_USAGE_BYTE_SECONDS_PRICE;
  const dataTransferInCost = usage.dataTransferIn * DATA_TRANSFER_IN_BYTES_PRICE;
  const dataTransferOutCost = usage.dataTransferOut * DATA_TRANSFER_OUT_BYTES_PRICE;
  const cost = diskUsageCost + dataTransferInCost + dataTransferOutCost;
  return { cost, diskUsageCost, dataTransferInCost, dataTransferOutCost };
};

const run = async () => {
  console.log('Starting billing daemon...');

  const cache = new Map<string, Usage>();
  const connection = await createConnectionFromEnv();

  const checkSufficientBalance = async () => {
    await connection.transaction(async (transaction) => {
      const usageByUser = await getUsageByUser(transaction);
      await Promise.all(
        usageByUser.map(async (usage) => {
          const { cost } = getCost(usage);
          if (cost > usage.balance) {
            console.log('LOCK ACCOUNT HERE');
          }
          console.log(cost);
          console.log(usage.balance);
        }),
      );
    });
  };

  const writeBillingPeriod = async () => {
    await connection.transaction(async (transaction) => {
      const torrents = await transaction
        .getRepository(Torrent)
        .createQueryBuilder('torrent')
        .where('is_active = true')
        .leftJoinAndSelect('torrent.user', 'user')
        .leftJoinAndSelect('torrent.server', 'server')
        .getMany();

      let torrentsDeluge = await Promise.all(torrents.map(torrent => torrent.injectDeluge()));
      torrentsDeluge = torrentsDeluge.filter(v => v);

      await Promise.all(
        (torrentsDeluge as Torrent[]).map(async (torrent) => {
          return transaction
            .getRepository(BillingPeriod)
            .createQueryBuilder('billing_period')
            .insert()
            .values({
              diskUsageByteSeconds: torrent.totalSize,
              diskUsageByteSecondsBilled: 0,
              dataTransferIn: torrent.totalDownloaded,
              dataTransferInBilled: 0,
              dataTransferOut: torrent.totalUploaded,
              dataTransferOutBilled: 0,
              torrent: await torrent as any,
              user: await torrent.user as any,
            })
            .onConflict(`
              (torrent_id)
                DO UPDATE SET
                  disk_usage_byte_seconds = EXCLUDED.disk_usage_byte_seconds + billing_period.disk_usage_byte_seconds,
                  data_transfer_in = EXCLUDED.data_transfer_in,
                  data_transfer_out = EXCLUDED.data_transfer_out
            `)
            .execute();
        }),
      );
    });
  };

  const writeBillingUsage = async () => {
    await connection.transaction(async (transaction) => {
      const torrents = await transaction
        .getRepository(Torrent)
        .createQueryBuilder('torrent')
        .where('is_active = true')
        .leftJoinAndSelect('torrent.user', 'user')
        .leftJoinAndSelect('torrent.server', 'server')
        .getMany();

      let torrentsDeluge = await Promise.all(torrents.map(torrent => torrent.injectDeluge()));
      torrentsDeluge = torrentsDeluge.filter(v => v);

      await Promise.all(
        (torrentsDeluge as Torrent[]).map(async (torrent) => {
          const cached = cache.get(torrent.id);
          const usage: Usage = {
            diskUsage: torrent.totalSize,
            dataTransferIn: torrent.totalDownloaded,
            dataTransferOut: torrent.totalUploaded,
          };
          if (cached &&
              cached.diskUsage === usage.diskUsage &&
              cached.dataTransferIn === usage.dataTransferIn &&
              cached.dataTransferOut === usage.dataTransferOut) {
            return Promise.resolve(undefined);
          }
          cache.set(torrent.id, usage);
          return transaction
            .getRepository(BillingUsage)
            .createQueryBuilder()
            .insert()
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

  const writeBillingHistory = async () => {
    await connection.transaction(async (transaction) => {
      const usageByUser = await getUsageByUser(transaction);

      await Promise.all(
        usageByUser.map((usage) => {
          const {
            cost,
            diskUsageCost,
            dataTransferInCost,
            dataTransferOutCost,
          } = getCost(usage);
          if (cost <= 0) {
            return Promise.resolve(undefined);
          }
          const history: History = {
            cost,
            diskUsageByteSeconds: usage.diskUsageByteSeconds,
            diskUsagePrice: DISK_USAGE_GB_MONTH_PRICE,
            diskUsageCost,
            dataTransferIn: usage.dataTransferIn,
            dataTransferInPrice: DATA_TRANSFER_IN_GB_PRICE,
            dataTransferInCost,
            dataTransferOut: usage.dataTransferOut,
            dataTransferOutPrice: DATA_TRANSFER_OUT_GB_PRICE,
            dataTransferOutCost,
            beginAt: usage.beginAt,
            endAt: usage.endAt,
          };
          const user = new User();
          user.id = usage.userId;
          const insertBillingHistory = transaction
            .getRepository(BillingHistory)
            .createQueryBuilder('billing_history')
            .insert()
            .values({
              ...history,
              user: user as any,
            })
            .execute();
          const updateUserBalance = transaction
            .getRepository(User)
            .createQueryBuilder('user')
            .update({
              balance: () => 'balance - :cost',
            })
            .setParameter('cost', history.cost)
            .where({
              id: user.id,
            })
            .execute();
          const updateBillingPeriod = transaction
            .getRepository(BillingPeriod)
            .createQueryBuilder('billing_period')
            .update({
              diskUsageByteSecondsBilled: () => 'disk_usage_byte_seconds',
              dataTransferInBilled: () => 'data_transfer_in',
              dataTransferOutBilled: () => 'data_transfer_out',
            })
            .where({
              user_id: user.id,
            })
            .execute();
          return Promise.all([insertBillingHistory, updateUserBalance, updateBillingPeriod]);
        }),
      );
    });
  };

  // checkSufficientBalance();
  // writeBillingPeriod();
  // writeBillingUsage();
  // writeBillingHistory();

  setInterval(checkSufficientBalance, 1 * 1000);
  setInterval(writeBillingPeriod, 1 * 1000);
  setInterval(writeBillingUsage, 60 * 1000);
  setInterval(writeBillingHistory, 86400 * 1000);
};

run();
