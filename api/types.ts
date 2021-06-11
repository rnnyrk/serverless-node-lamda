import AWS from 'aws-sdk';

export type DatabaseType = AWS.DynamoDB.DocumentClient;

export type User = {
  id?: string;
  name: string;
  email: string;
};

type Question = {
  id: string;
  text: string;
}

export type Questionnaire = {
  id?: string;
  title: string;
  questions: Question[];
};

export type CreateQuestionnairePayload = {
  title: string;
  questions: Question[];
};

export type ApolloContext = {
  token: string;
};
