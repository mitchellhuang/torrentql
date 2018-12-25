const serverless = require('serverless-http');
const server = require('./server-esm');

exports.handler = serverless(server);
