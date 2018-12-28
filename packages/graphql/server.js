require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const port = parseInt(process.env.PORT, 10) || 3001;

const app = express();
server.applyMiddleware({ app });

if (!process.env.LAMBDA) {
  require('./lib/knex');
  app.listen({ port }, () =>
    console.log(`> Ready on http://localhost:${port}`),
  );
}

module.exports = app;
