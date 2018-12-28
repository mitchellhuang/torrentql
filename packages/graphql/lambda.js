const serverless = require('serverless-http');
const server = require('./server');
const knex = require('./lib/knex');

const handler = serverless(server);

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await handler(event, context);
}
