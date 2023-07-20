const Constants = require("./constants");
const sendMessage = require("./slack");

const catchError = (message, error = null) => {
    sendMessage(Constants.SlackMessageType.ERROR, message, error);

    throw new Error(message);
}

const sendLog = (message) => {
    sendMessage(Constants.SlackMessageType.INFO, message);
}

const sendSuccessMessage = (message) => {
    sendMessage(Constants.SlackMessageType.SUCCESS, message);
}

module.exports = {
    catchError,
    sendLog,
    sendSuccessMessage
};