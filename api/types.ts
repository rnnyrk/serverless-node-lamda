import AWS from 'aws-sdk';

export type DatabaseType = AWS.DynamoDB.DocumentClient;

export type User = {
  id?: string;
  name: string;
};
