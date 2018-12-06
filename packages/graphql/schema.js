const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    email: String
  }
  type Query {
    hello: String
  }
`;

export default typeDefs;
