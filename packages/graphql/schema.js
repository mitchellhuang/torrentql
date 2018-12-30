const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
    email: String
    token: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String): User
    createUser(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
