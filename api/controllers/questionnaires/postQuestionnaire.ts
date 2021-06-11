import { v4 as uuidv4 } from 'uuid';
import * as i from '../../types';

export const postQuestionnaire = (
  db: i.DatabaseType,
  table: string,
  questionnaire: i.Questionnaire,
) => {
  return new Promise<i.Questionnaire>((resolve, reject) => {
    const { name, questions } = questionnaire;

    if (!name || typeof name !== 'string') {
      reject('"name" must be a string');
    }
    if (!questions || !Array.isArray(questions)) {
      reject('"questions" is not an array');
    }

    const id = uuidv4();

    const params = {
      TableName: table,
      Item: { id, name, questions },
    };

    db.put(params, (error) => {
      if (error) {
        console.error(error);
        reject('Could not create questionnaire');
      }

      resolve({ id, name, questions });
    });
  })
    .then((response) => response)
    .catch((error) => error);
};
