const serverless = require('serverless-http');
const mysql = require('serverless-mysql');
const server = require('./server');
const knex = require('./lib/knex');

const handler = serverless(server);

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const resp = await handler(event, context);
  await mysql.end();
  return resp;
}
