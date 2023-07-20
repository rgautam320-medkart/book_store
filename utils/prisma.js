const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const app = require("./express");

const resolvers = require('./resolvers');
const typeDefs = require('./types');
const Config = require('./config');
const sendMessage = require('./slack');

// Prisma client
const prisma = new PrismaClient();

// Add a Aiddleware to Prisma Client ...
prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    sendMessage(Constants.SlackMessageType.LOG, `Query ${params.model}.${params.action} Took ${after - before}ms`);

    return result;
});

// Apollo Server
async function prismaServer() {
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
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
        cors: { credentials: true, origin: [Config.playground_url] },
    });

    // Apply Apollo Server Middleware to Express app
    server.applyMiddleware({ app })

    // Start the server
    app.listen(Config.port, () => {
        console.log(`Server is Running on ${Config.port}`);
    });
}

module.exports = prismaServer;