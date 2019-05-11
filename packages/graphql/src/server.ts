import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import knex from './lib/knex';
import * as jwt from './lib/jwt';
import typeDefs from './schema';
import resolvers from './resolvers';

const port = parseInt(process.env.PORT, 10) || 3001;

interface AuthRequest extends express.Request {
  user?: {
    id: string,
    email: string,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: {req: AuthRequest}) => ({ user: req.user }),
  introspection: true,
});

const app = express();

app.use(jwt.decode());

server.applyMiddleware({ app });

app.get('/health', (req, res) => {
  knex.raw('select 1+1 as result').then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(503);
  });
});

if (!process.env.LAMBDA) {
  app.listen({ port }, () => {
    // eslint-disable-next-line
    console.log(`> Ready on http://localhost:${port}`);
  });
}

export default app;
