import express from 'express';
import serverless from 'serverless-http';
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
