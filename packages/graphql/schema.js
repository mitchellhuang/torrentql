import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    email: String
  }
  type Query {
    user: String
  }
`;

export default typeDefs;
