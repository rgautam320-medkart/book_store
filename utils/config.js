const dotenv = require('dotenv');

// Load Environment Variables From .env File
dotenv.config();

const Config = {
    debug: process.env.ENABLE_DEBUG ?? false,
    port: process.env.PORT ?? 4000,

    playground_url: process.env.PLAYGROUND_URL ?? 'http://127.0.0.1:4000',

    node_env: process.env.NODE_ENV ?? 'development',

    database_url: process.env.DATABASE_URL ?? "",

    jwt_secret: process.env.JWT_SECRET ?? "",

    slack_bot_token: process.env.SLACK_BOT_TOKEN ?? "",
    slack_channel: process.env.SLACK_CHANNEL,
};

module.exports = Config;