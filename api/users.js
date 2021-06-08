const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([
    {
      userId: '1',
      name: 'Ronny',
    },
    {
      userId: '2',
      name: 'Stefan',
    },
    {
      userId: '3',
      name: 'Jorn',
    }
  ]);
})

app.get('/users/:userId', (req, res) => {
  res.json({
    userId: `${req.params.userId}`,
    name: 'Ronny',
  });
})

module.exports.handler = serverless(app);