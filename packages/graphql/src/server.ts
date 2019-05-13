import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { useContainer } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { join } from 'path';
import * as db from './lib/db';
import * as jwt from './lib/jwt';
import { Context } from './lib/context';

const port = parseInt(process.env.PORT, 10) || 3001;

useContainer(Container);

interface AuthRequest extends express.Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createServer = async () => {
  const connection = await db.init();

  const schema = await buildSchema({
    resolvers: [
      join(__dirname, './resolvers/*.js'),
    ],
    container: Container,
  });

  const context = ({ req }: {req: AuthRequest}): Context => ({
    user: req.user,
  });

  const apollo = new ApolloServer({
    schema,
    context,
    introspection: true,
  });

  const server = express();

  server.use(jwt.decode());

  apollo.applyMiddleware({ app: server });

  server.get('/health', async (req, res) => {
    try {
      await connection.query('select 1+1 as result');
    } catch (err) {
      res.sendStatus(503);
    }
    res.sendStatus(200);
  });

  server.listen({ port }, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

createServer();
