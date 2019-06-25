import 'dotenv/config';
import 'reflect-metadata';
import { join } from 'path';
import express from 'express';
import serveIndex from 'serve-index';
import { useContainer } from 'typeorm';
import { buildSchema, emitSchemaDefinitionFile } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import * as db from './lib/db';
import * as jwt from './lib/jwt';
import { createContext, authChecker } from './lib/context';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

useContainer(Container);

export const createServer = async () => {
  const connection = await db.init();

  const schema = await buildSchema({
    resolvers: [
      join(__dirname, './resolvers/*.js'),
    ],
    container: Container,
    authChecker,
  });

  await emitSchemaDefinitionFile('./schema.graphql', schema);

  const apollo = new ApolloServer({
    schema,
    context: createContext(connection),
    introspection: true,
  });

  const server = express();

  server.use(jwt.decode());

  if (dev) {
    if (process.env.FILES_PATH) {
      server.use(
        '/files',
        express.static(process.env.FILES_PATH),
        serveIndex(process.env.FILES_PATH, { icons: true }),
      );
    }
  }

  apollo.applyMiddleware({ app: server });

  server.get('/', (req, res) => {
    res.sendStatus(200);
  });

  server.get('/health', async (req, res) => {
    try {
      await connection.query('select 1+1 as result');
    } catch (err) {
      res.sendStatus(503);
    }
    res.sendStatus(200);
  });

  if (!process.env.LAMBDA) {
    server.listen({ port }, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  }

  return server;
};

createServer();
