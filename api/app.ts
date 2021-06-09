import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { ApolloServer } from 'apollo-server-express';

import { Query } from './schema';
import { Questionnaires } from './questionnaires/schema';
import { Users } from './users/schema';
import { resolvers } from './resolvers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs: [Query, Users, Questionnaires],
  resolvers,
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
