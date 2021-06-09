import 'cross-fetch/polyfill';
import { AuthenticationError } from 'apollo-server-express';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import config from './cognito.json';
const { REGION, USER_POOL_ID, APP_CLIENT_ID } = config['development'];

// const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: APP_CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export const loginUser = (username: string, password: string) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      console.log('id token + ' + result.getIdToken().getJwtToken());
      console.log('refresh token + ' + result.getRefreshToken().getToken());

      return {
        accessToken: result.getAccessToken().getJwtToken(),
        idToken: result.getAccessToken().getJwtToken(),
        refreshToken: result.getAccessToken().getJwtToken(),
      };
    },
    onFailure: (err) => {
      console.log('AWS error', err);
    },
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      console.log({ userAttributes, requiredAttributes });

      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.

      // the api doesn't accept this field back
      delete userAttributes.email_verified;
    }
  });
};

export const changePassword = (username, oldPassword, newPassword) => {
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
    if (err) {
      console.error(err.message || JSON.stringify(err));
      return;
    }
    console.log('call result: ' + result);
  });
};

export const authToken = (token: string) => {
  if (token !== '1234567890') {
    throw new AuthenticationError('Invalid token');
  }

  const user = {
    id: 1,
    username: 'demouser',
    role: 'admin'
  }

  return user;
};
