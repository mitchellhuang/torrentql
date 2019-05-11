import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'express-jwt';
import knex from './lib/knex';
import typeDefs from './schema';
import resolvers from './resolvers';

const port = parseInt(process.env.PORT, 10) || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
  introspection: true,
});

const app = express();

app.use(jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
}));

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
