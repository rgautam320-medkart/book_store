const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const app = require("./express");

const resolvers = require('./resolvers');
const typeDefs = require('./types');
const Config = require('./config');

// Apollo Server
async function prismaServer() {
    const server = new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs: typeDefs,
            resolvers: resolvers,
        }),
        context: ({ req }) => {
            return {
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