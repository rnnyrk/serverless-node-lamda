import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import { UsersResolvers } from '@resolvers/users';
import { QuestionnairesResolvers } from '@resolvers/questionnaires';
import { QuestionnairesSchema } from '@models/questionnaires';
import { UsersSchema } from '@models/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([UsersSchema, QuestionnairesSchema]),
  resolvers: mergeResolvers([UsersResolvers, QuestionnairesResolvers]),
  context: ({ req }) => {
    // @TODO 1. verify jwt token
    const token = req.headers.authorization || null;
    if (!token) {
      throw new AuthenticationError('Required token is missing');
    }

    return { token };
  },
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
