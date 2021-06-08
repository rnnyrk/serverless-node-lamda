import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: String
    name: String
  }

  type Query {
    getUsers: [User]
  }
`;
