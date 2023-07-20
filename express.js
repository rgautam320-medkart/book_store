const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const graphqlPlayground = require('graphql-playground-middleware-express');

const { authenticateToken } = require("./middleware/authentication")

// Express app
const app = express();

// Middleware for cors, body parser
app.use(cors());
app.use(bodyParser.json());

// Starting GraphQL Server
app.use('/playground', graphqlPlayground.default({ endpoint: '/graphql' }));

// Middleware for verifying JWT token
app.use(authenticateToken);

// Export Module
module.exports = app;