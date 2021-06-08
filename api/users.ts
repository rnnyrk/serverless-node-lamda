import serverless, { Application } from 'serverless-http';
import express from 'express';
import AWS from 'aws-sdk';

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  const params = {
    TableName: USERS_TABLE,
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get all users' });
    }

    if (result) {
      const json = result.Items.map((user) => user);
      res.json(json);
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  });
})

app.get('/users/:userId', (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.userId,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }

    if (result.Item) {
      const { id, name } = result.Item;
      res.json({ id, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})

app.post('/users/create', (req, res) => {
  const { id, name } = req.body;

  if (typeof id !== 'string') {
    res.status(400).json({ error: '"id" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      id,
      name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ id, name });
  });
})

module.exports.handler = serverless(app as unknown as Application);