import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import { resolvers } from './resolvers';
import { Query } from './schema';
import { Questionnaires } from './questionnaires/schema';
import { Users } from './users/schema';
import { loginUser } from './users/authentication';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs: [Query, Users, Questionnaires],
  resolvers,
  context: ({ req }) => {
    // @TODO verify jwt token?

    const token = req.headers.authorization || null;
    if (!token) {
      throw new AuthenticationError('Required token is missing');
    }

    return { token };
  }
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
