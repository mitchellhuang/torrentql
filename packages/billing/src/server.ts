import 'dotenv/config';
import { createConnectionFromEnv } from '@torrentql/common/dist/lib/db';

const createServer = async () => {
  const connection = await createConnectionFromEnv();
  setInterval(() => console.log(Math.random()), 1000);
};

createServer();
