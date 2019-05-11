import serverless from 'serverless-http';
import server from './server';

export const handler = serverless(server);
