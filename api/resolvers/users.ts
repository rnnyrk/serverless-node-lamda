import AWS from 'aws-sdk';

import { fetchUser } from '../controllers/users/fetchUser';
import { fetchUsers } from '../controllers/users/fetchUsers';
import { postUser } from '../controllers/users/postUser';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const UsersResolvers = {
  Query: {
    listUsers: (_root, _args, context) => {
      try {
        if (!context.token) return null;
        return fetchUsers(dynamoDb, USERS_TABLE);
      } catch (error) {
        throw error;
      }
    },
    getUser: (_root, args: Record<'userId', string>, context) => {
      try {
        if (!context.token) return null;
        return fetchUser(dynamoDb, USERS_TABLE, args.userId);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: (_root, args: Record<'name' | 'email', string>, context) => {
      try {
        if (!context.token) return null;

        const { name, email } = args;
        return postUser(dynamoDb, USERS_TABLE, { name, email });
      } catch (error) {
        throw error;
      }
    },
  }
};
