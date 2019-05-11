import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { getConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import * as db from './lib/db';
import * as jwt from './lib/jwt';
import { Context } from './lib/context';
import typeDefs from './schema';
import resolvers from './resolvers';

const port = parseInt(process.env.PORT, 10) || 3001;

interface AuthRequest extends express.Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createServer = async () => {
  const connection = await db.init();

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: {req: AuthRequest}): Context => ({
      user: req.user,
      connection,
    }),
    introspection: true,
  });

  const server = express();

  server.use(jwt.decode());

  apollo.applyMiddleware({ app: server });

  server.get('/health', async (req, res) => {
    try {
      await getConnection().query('select 1+1 as result');
    } catch (err) {
      res.sendStatus(503);
    }
    res.sendStatus(200);
  });

  if (!process.env.LAMBDA) {
    server.listen({ port }, () => {
      // eslint-disable-next-line
      console.log(`> Ready on http://localhost:${port}`);
    });
  }

  return server;
};

const server = createServer();

export default server;
