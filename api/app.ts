import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { merge } from 'lodash';

import { UsersResolvers } from './resolvers/users';
import { QuestionnairesSchema } from './models/questionnaires';
import { UsersSchema } from './models/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs: [UsersSchema, QuestionnairesSchema],
  resolvers: UsersResolvers,
  context: ({ req }) => {
    // @TODO verify jwt token, get user based on token and return user instead of token?!
    // https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt

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
