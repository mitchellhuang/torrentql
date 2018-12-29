require('dotenv').config();
require('./lib/knex');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = parseInt(process.env.PORT, 10) || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

const app = express();
server.applyMiddleware({ app });

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen({ port }, () =>
  console.log(`> Ready on http://localhost:${port}`),
);
