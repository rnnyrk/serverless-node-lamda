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
    console.log({
      // body: req.body,
      header: req.headers.authorization,
    });

    // const token = req.headers.authorization || '';
    // if (!token) {
    //   throw new AuthenticationError('Required token is missing');
    // }

    // // try to retrieve a user with the token
    // const user = loginUser(req.body.username, req.body.password);

    // // add the user to the context
    // return { user };
  }
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
