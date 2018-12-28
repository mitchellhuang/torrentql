const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    email: String
  }
  type Query {
    user: String
  }
`;

module.exports = typeDefs;
