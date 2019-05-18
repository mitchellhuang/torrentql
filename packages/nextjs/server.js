require('dotenv').config();
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = async () => {
  const server = express();

  if (dev) {
    server.use(proxy(process.env.API_URI));
  }

  server.get('*', (req, res) => handle(req, res));

  await app.prepare();

  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line
    console.log(`> Ready on http://localhost:${port}`);
  });

  return server;
};

createServer();
