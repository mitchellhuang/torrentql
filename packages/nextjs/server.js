require('dotenv').config();
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => {
  const server = express();
  if (dev) {
    server.use(proxy(`${process.env.API_URI}/graphql`));
    server.use(proxy(`${process.env.API_URI}/graphiql`));
  }
  if (!dev) {
    server.get(
      /^\/_next\/static\/(runtime|chunks|images|css)\//,
      (_, res, nextHandler) => {
        res.setHeader(
          'Cache-Control',
          'public, max-age=31536000, immutable',
        );
        nextHandler();
      },
    );
  }
  server.get('*', (req, res) => handle(req, res));
  return server;
};

const server = createServer();

if (!process.env.LAMBDA) {
  app.prepare()
    .then(() => {
      server.listen(port, (err) => {
        if (err) throw err;
        // eslint-disable-next-line
        console.log(`> Ready on http://localhost:${port}`);
      });
    });
}

exports.app = app;
exports.server = server;
