import AWS from 'aws-sdk';

export type DatabaseType = AWS.DynamoDB.DocumentClient;

export type User = {
  id?: string;
  name: string;
};

type Question = {
  id: string;
  text: string;
}

export type Questionnaire = {
  id?: string;
  name: string;
  questions: Question[];
};