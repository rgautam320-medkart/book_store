const prismaServer = require('./utils/prisma');

const { catchError } = require('./utils/utils');

process.on('unhandledRejection', function (error) {
    catchError(`Unhandled Exception: ${error.message}`, error);
});

prismaServer().catch((error) => {
    catchError(`Error Starting the Server: ${error.message}`, error);
});

process.on('uncaughtException', function (error) {
    catchError(`Uncaught Exception: ${error.message}`, error);
});