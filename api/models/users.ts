import { gql } from 'apollo-server-express';

export const UsersSchema = gql`
  type User {
    id: String
    name: String
  }

  type Query {
    getUser(userId: String!): User
    listUsers: [User]
  }

  type Mutation {
    createUser(name: String!): User
  },
`;
