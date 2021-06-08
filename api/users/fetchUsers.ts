import * as i from '../types';

export const fetchUsers = (
  db: i.DatabaseType,
  table: string,
) => {
  const params = {
    TableName: table,
  }

  return new Promise((resolve, reject) => {
    db.scan(params, (error, result) => {
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
    .catch((error) => error);
};
