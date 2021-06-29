import * as i from '@types';
import AWS from 'aws-sdk';

import { fetchUser } from '@controllers/users/fetchUser';
import { fetchUsers } from '@controllers/users/fetchUsers';
import { postUser } from '@controllers/users/postUser';
import { handleError } from '@services/handleError';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const UsersResolvers = {
  Query: {
    listUsers: (parent: void, args: void, context: i.ApolloContext) => {
      try {
        if (!context.token) return null;
        return fetchUsers(dynamoDb, USERS_TABLE);
      } catch (error) {
        handleError(error);
      }
    },
    getUser: (parent: void, args: Record<'userId', string>, context: i.ApolloContext) => {
      try {
        if (!context.token) return null;
        return fetchUser(dynamoDb, USERS_TABLE, args.userId);
      } catch (error) {
        handleError(error);
      }
    },
  },

  Mutation: {
    createUser: (parent: void, args: Record<'name' | 'email' | 'city', string>, context: i.ApolloContext) => {
      try {
        if (!context.token) return null;

        const { name, email, city } = args;
        return postUser(dynamoDb, USERS_TABLE, { name, email, city });
      } catch (error) {
        handleError(error);
      }
    },
  },
};
