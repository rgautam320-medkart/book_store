const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = require("./express");

const resolvers = require('./resolvers');
const typeDefs = require('./types');
const Config = require('./config');
const { sendLog } = require('./utils');

// Prisma client
const prisma = new PrismaClient();

// Add a Aiddleware to Prisma Client ...
prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    sendLog(`Query ${params.model}.${params.action} Took ${after - before}ms`);

    return result;
});

// Apollo Server
async function prismaServer() {
    const server = new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs: typeDefs,
            resolvers: resolvers,
        }),
        context: ({ req }) => {
            return {
                prisma,
                req
            };
        },
        formatError: (error) => {
            const { message, locations, path } = error;

            return {
                status: 400,
                code: error.extensions.code,
                message: message,
                path: path,
                locations: locations
            };
        },
        formatResponse: (response) => {
            return {
                data: response.data,
                errors: response.errors,
            }
        },
        debug: Config.debug,
    });

    await server.start({
        cors: { credentials: true, origin: [Config.playground_url] },
    });

    // Apply Apollo Server Middleware to Express app
    server.applyMiddleware({ app })

    // Start the server
    app.listen(Config.port, () => {
        console.log(`🚀 Server is Running on ${Config.port} 🚀`);
    });
}

module.exports = prismaServer;