import { gql } from 'apollo-server-express';

export const Query = gql`
  type Query {
    getUser(userId: String!): User
    listUsers: [User]
  }

  type Mutation {
    loginUser(username: String!, password: String!): User
    createUser(name: String!): User
  },
`;
