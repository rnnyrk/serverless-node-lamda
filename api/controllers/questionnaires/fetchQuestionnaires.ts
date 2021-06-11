import * as i from '../../types';

export const fetchQuestionnaires = (
  db: i.DatabaseType,
  table: string,
) => {
  const params = {
    TableName: table,
  }

  return new Promise<i.Questionnaire[]>((resolve, reject) => {
    db.scan(params, (error, result) => {
      if (error) {
        console.error(error);
        reject(error.message);
      }

      if (result) {
        const questionnaires = result.Items.map((q: i.Questionnaire) => q);
        resolve(questionnaires);
      } else {
        reject('Error fetching questionnaires');
      }
    });
  })
    .then((response) => response)
    .catch((error) => error);
};
