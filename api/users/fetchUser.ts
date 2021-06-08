import * as i from '../types';

export const fetchUser = (
  db: i.DatabaseType,
  table: string,
  id: string,
) => {
  const params = {
    TableName: table,
    Key: { id },
  }

  return new Promise((resolve, reject) => {
    db.get(params, (error, result) => {
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
    .catch((error) => error);
};
