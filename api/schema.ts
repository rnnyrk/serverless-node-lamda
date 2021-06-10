import { gql } from 'apollo-server-express';

export const Query = gql`
  type Query {
    getUser(userId: String!): User
    listUsers: [User]
  }

  type Mutation {
    createUser(name: String!): User
  },
`;
