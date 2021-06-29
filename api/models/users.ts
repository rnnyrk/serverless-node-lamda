import { gql } from 'apollo-server-express';

export const UsersSchema = gql`
  type User {
    id: ID!
    name: String
    email: String
    city: String
  }

  type Query {
    getUser(userId: String!): User
    listUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, city: String!): User
  },
`;
