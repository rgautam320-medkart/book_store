const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const graphqlPlayground = require('graphql-playground-middleware-express');

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import models and resolvers
const User = require('./typeDefs/User');
const Book = require('./typeDefs/Book');
const Author = require('./typeDefs/Author');

const userResolvers = require('./resolvers/user');
const bookResolvers = require('./resolvers/book');
const authorResolvers = require('./resolvers/author');

const { authenticateToken } = require('./middleware/middleware');

// Prisma client
const prisma = new PrismaClient();

// Express app
const app = express();

// Middleware for cors, body parser
app.use(cors());
app.use(bodyParser.json());

// Starting GraphQL Server
app.use('/playground', graphqlPlayground.default({ endpoint: '/graphql' }));

// Middleware for verifying JWT token
app.use(authenticateToken);

process.on('unhandledRejection', function (err) {
    console.error(err.message);
});

// Apollo Server
async function startServer() {
    const server = new ApolloServer({
        typeDefs: [User.typeDef, Book.typeDef, Author.typeDef],
        resolvers: [userResolvers, bookResolvers, authorResolvers],
        context: ({ req, res }) => {
            return {
                prisma,
                req,
                res,
            };
        },
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await server.start({
        cors: { credentials: true, origin: [process.env.PLAYGROUND_URL] },
    });

    // Apply Apollo Server middleware to Express app
    server.applyMiddleware({ app })

    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running on ${process.env.PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Error starting the server:', error);
});

process.on('uncaughtException', function (err) {
    console.error(err.message);
});