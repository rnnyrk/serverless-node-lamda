"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const app = express_1.default();
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
});
app.get('/users/:userId', (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            id: req.params.userId,
        },
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get user' });
        }
        if (result.Item) {
            const { id, name } = result.Item;
            res.json({ id, name });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    });
});
app.post('/users/create', (req, res) => {
    const { id, name } = req.body;
    if (typeof id !== 'string') {
        res.status(400).json({ error: '"id" must be a string' });
    }
    else if (typeof name !== 'string') {
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
});
module.exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=users.js.map