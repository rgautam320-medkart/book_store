const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const graphqlPlayground = require('graphql-playground-middleware-express');

// Express app
const app = express();

// Middleware for cors, body parser
app.use(cors());
app.use(bodyParser.json());

// Starting GraphQL Server
app.use('/playground', graphqlPlayground.default({ endpoint: '/graphql' }));

// Export Module
module.exports = app;