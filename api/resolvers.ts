import AWS from 'aws-sdk';

import { fetchUser } from './users/fetchUser';
import { fetchUsers } from './users/fetchUsers';
import { postUser } from './users/postUser';
import { loginUser as loginCoginito } from './users/authentication';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
  Query: {
    listUsers: () => {
      try {
        return fetchUsers(dynamoDb, USERS_TABLE);
      } catch (error) {
        throw error;
      }
    },
    getUser: (_, args: Record<'userId', string>) => {
      try {
        return fetchUser(dynamoDb, USERS_TABLE, args.userId);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    loginUser: (_, args: Record<'username' | 'password', string>) => {
      try {
        const credentials = loginCoginito(args.username, args.password);
        console.log({ credentials });
        return credentials;
      } catch (error) {
        throw error;
      }
    },
    createUser: (_, args: Record<'name', string>) => {
      try {
        return postUser(dynamoDb, USERS_TABLE, { name: args.name });
      } catch (error) {
        throw error;
      }
    },
  }
};
