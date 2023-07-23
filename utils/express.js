const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const jwtMiddleware = require('../middleware/auth');

// Express app
const app = express();

// Middleware for cors, body parser
app.use(cors());
app.use(bodyParser.json());

// Applying GraphQL
app.use('/graphql', (req, res, next) => {

    let { operationName, query } = req.body;

    if (operationName === 'Mutation') {
        let query1 = query.replace(query.substring(0, query.indexOf("{") + 1), "")?.trim();
        operationName = query1.substring(0, query1.indexOf("("));
    }

    if (operationName && operationName !== 'IntrospectionQuery') {
        req.operationName = operationName?.toLowerCase();
    }

    next();
});

// Apply Middleware
app.use(jwtMiddleware);

// Export Module
module.exports = app;