import AWS from 'aws-sdk';
import * as i from '../types';

import { fetchQuestionnaires } from '../controllers/questionnaires/fetchQuestionnaires';
import { postQuestionnaire } from '../controllers/questionnaires/postQuestionnaire';

const QS_TABLE = process.env.QS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const QuestionnairesResolvers = {
  Query: {
    listQuestionnaires: (_root, _args, context) => {
      try {
        if (!context.token) return null;
        return fetchQuestionnaires(dynamoDb, QS_TABLE);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createQuestionnaire: (_root, args: i.CreateQuestionnairePayload, context) => {
      try {
        if (!context.token) return null;

        const { title, questions } = args;
        return postQuestionnaire(dynamoDb, QS_TABLE, { title, questions });
      } catch (error) {
        throw error;
      }
    },
  }
};
