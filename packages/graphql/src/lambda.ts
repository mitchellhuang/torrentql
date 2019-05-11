import serverless from 'serverless-http';
import server from './server';

export const handler = async (event, context) => {
  const app = await server;
  return serverless(app);
};
