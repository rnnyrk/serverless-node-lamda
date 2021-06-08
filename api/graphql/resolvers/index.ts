import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const resolvers = {
  Query: {
    listUsers: () => {
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
          .then((response) => response)
          .catch((error) => {
            console.log({ error });
            throw new Error(error);
          });
      } catch (error) {
        throw error;
      }
    },
    getUser: (_, args) => {
      try {
        const params = {
          TableName: USERS_TABLE,
          Key: {
            id: args.userId,
          },
        }

        return new Promise((resolve, reject) => {
          dynamoDb.get(params, (error, result) => {
            if (error) {
              console.error(error);
              reject('Could not get user by id');
            }

            if (result.Item) {
              const { id, name } = result.Item;
              resolve({ id, name });
            } else {
              reject('User not found');
            }
          });
        })
          .then((response) => response)
          .catch((error) => {
            console.log({ error });
            throw new Error(error);
          });
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: (_, args) => {
      try {
        return new Promise((resolve, reject) => {
          const { name } = args;

          if (!name || typeof name !== 'string') {
            reject('"name" must be a string');
          }

          const id = uuidv4();

          const params = {
            TableName: USERS_TABLE,
            Item: { id, name },
          };

          dynamoDb.put(params, (error) => {
            if (error) {
              console.error(error);
              reject('Could not create user');
            }

            resolve({ id, name });
          });
        })
          .then((response) => response)
          .catch((error) => {
            console.log({ error });
            throw new Error(error);
          });
      } catch (error) {
        throw error;
      }
    },
  }
};
