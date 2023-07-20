const prismaServer = require('./utils/prisma');

const Constants = require('./utils/constants');
const sendMessage = require('./utils/slack');

process.on('unhandledRejection', function (err) {
    sendMessage(Constants.SlackMessageType.ERROR, `Uncaught Exception: ${err.message}`, err.stack);
});

prismaServer().catch((error) => {
    sendMessage(Constants.SlackMessageType.ERROR, "Error starting the server", error);
});

process.on('uncaughtException', function (err) {
    sendMessage(Constants.SlackMessageType.ERROR, `Uncaught Exception: ${err.message}`, err.stack);
});