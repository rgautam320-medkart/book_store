const { WebClient } = require('@slack/web-api');

const Config = require('./config');
const Constants = require('./constants');

const slackToken = Config.slack_bot_token;

const slackClient = new WebClient(slackToken);

async function sendMessage(type, message, error = null) {
    try {
        await slackClient.chat.postMessage({
            channel: Config.slack_channel,
            text: type,
            blocks: [
                {
                    type: "header",
                    text:
                    {
                        type: Constants.SlackMessageFormat.HEADER_TYPE,
                        text: type
                    }
                },
                {
                    type: Constants.SlackMessageFormat.DIVIDER,
                },
                {
                    type: "section",
                    text:
                    {
                        type: Constants.SlackMessageFormat.SECTION_TYPE,
                        text: message
                    }
                },
                {
                    type: Constants.SlackMessageFormat.DIVIDER,
                },
                {
                    type: "section",
                    text:
                    {
                        type: Constants.SlackMessageFormat.SECTION_TYPE,
                        text: error ? error?.toString() : "..."
                    }
                },
            ]
        });
    } catch (error) {
        console.error('Error Sending Message: ', error);
    }
}

module.exports = sendMessage;