import { v4 as uuidv4 } from 'uuid';
import * as i from '../types';

export const postUser = (
  db: i.DatabaseType,
  table: string,
  user: i.User,
) => {
  return new Promise<i.User>((resolve, reject) => {
    const { name } = user;

    if (!name || typeof name !== 'string') {
      reject('"name" must be a string');
    }

    const id = uuidv4();

    const params = {
      TableName: table,
      Item: { id, name },
    };

    db.put(params, (error) => {
      if (error) {
        console.error(error);
        reject('Could not create user');
      }

      resolve({ id, name });
    });
  })
    .then((response) => response)
    .catch((error) => error);
};
