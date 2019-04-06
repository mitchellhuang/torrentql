const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const routes = require('./routes');

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'binary/octet-stream',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
  'image/x-icon',
  'image/svg+xml',
  'application/font-woff2',
  'application/font-woff',
  'font/woff',
  'font/woff2',
];

const app = express();

app.use('/_next/static', express.static(path.join(__dirname, '../.next/static')));
app.get('/health', (req, res) => {
  res.sendStatus(200);
});
routes.forEach((route) => {
  app.get(route.path, (req, res) => require(path.join(__dirname, `../.next/serverless/pages${route.page}.js`)).render(req, res));
});

exports.handler = serverless(app, {
  binary: binaryMimeTypes,
});
