import serverless from 'serverless-http';
import { createServer } from './server';

export const handler = async (event, context) => {
  const app = await createServer();
  return serverless(app);
};
