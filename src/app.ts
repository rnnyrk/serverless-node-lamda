import * as i from 'types';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { ApolloServer } from 'apollo-server-express';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import fetch from 'node-fetch';
import status from 'http-status';

import { UsersResolvers } from 'resolvers/users';
import { QuestionnairesResolvers } from 'resolvers/questionnaires';
import { QuestionnairesSchema } from 'models/questionnaires';
import { UsersSchema } from 'models/users';

import cognitoCfg from '../cognito.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Token verification process **/
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html

// Request JWK from Cognito
const { REGION, USER_POOL_ID } = cognitoCfg[process.env.NODE_ENV || 'development'];
const jwkUrl = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`;

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([UsersSchema, QuestionnairesSchema]),
  resolvers: mergeResolvers([UsersResolvers, QuestionnairesResolvers]),
  context: async ({ req, res }) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    // A token is mandatory
    if (!token) {
      return res.send(status.UNAUTHORIZED);
    }

    const jwkResult = await fetch(jwkUrl);
    const jwkJson = await jwkResult.json() as i.CognitoJWKResult | undefined;
    if (!jwkJson) {
      return res.send(status.INTERNAL_SERVER_ERROR);
    }

    // Get first key
    const jwk = jwkJson.keys[0];
    if (!jwk) {
      return res.send(status.INTERNAL_SERVER_ERROR);
    }

    // Convert JWK to PEM
    const pem = jwkToPem(jwk);

    // Verify token with the PEM
    jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, payload) => {
      if (err) {
        return res.send(status.UNAUTHORIZED);
      }

      return {
        email: payload.email,
        email_verified: payload.email_verified,
        phone_number: payload.phone_number,
      };
    });
  },
});

server.applyMiddleware({ app });

const handler = serverless(app);
export { handler };
