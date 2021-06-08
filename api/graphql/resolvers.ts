import AWS from 'aws-sdk';
import { response } from 'express';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
  Query: {
    getUsers: (_, args) => {
      try {
        const params = {
          TableName: USERS_TABLE,
        }

        return new Promise((resolve, reject) => {
          dynamoDb.scan(params, (error, result) => {
            if (error) {
              console.error(error);
              reject(error.message);
            }

            if (result) {
              const users = result.Items.map((user) => user);
              resolve(users);
            } else {
              reject('Error fetching users');
            }
          });
        })
          .then((response) => {
            console.log({ response });
            return response;
          })
          .catch((error) => {
            console.log({ error });
            throw new Error(error);
          });
      } catch (error) {
        throw error;
      }
    },
  },
};
