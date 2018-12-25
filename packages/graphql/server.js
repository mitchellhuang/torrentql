import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers });
const port = parseInt(process.env.PORT, 10) || 3001;

const app = express();
server.applyMiddleware({ app });

if (!process.env.LAMBDA) {
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
  );
}

module.exports = app;
