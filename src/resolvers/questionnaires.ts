import * as i from 'types';
import AWS from 'aws-sdk';

import { fetchQuestionnaires } from 'controllers/questionnaires/fetchQuestionnaires';
import { postQuestionnaire } from 'controllers/questionnaires/postQuestionnaire';
import { handleError } from 'services/handleError';

const QS_TABLE = process.env.QS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const QuestionnairesResolvers = {
  Query: {
    listQuestionnaires: (parent: void, args: void, context: i.ApolloContext) => {
      try {
        if (!context.token) return null;
        return fetchQuestionnaires(dynamoDb, QS_TABLE);
      } catch (error) {
        handleError(error);
      }
    },
  },

  Mutation: {
    createQuestionnaire: (parent: void, args: i.CreateQuestionnairePayload, context: i.ApolloContext) => {
      try {
        if (!context.token) return null;

        const { title, questions } = args;
        return postQuestionnaire(dynamoDb, QS_TABLE, { title, questions });
      } catch (error) {
        handleError(error);
      }
    },
  },
};
