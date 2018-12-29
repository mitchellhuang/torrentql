const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    email: String
  }
  type Query {
    me: User
  }
`;

module.exports = typeDefs;
