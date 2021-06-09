import { gql } from 'apollo-server-express';

export const Users = gql`
  type User {
    id: String
    name: String
  }
`;
