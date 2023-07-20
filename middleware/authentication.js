const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const Config = require('../config');
const sendMessage = require('../slack');
const Constants = require('../utils/constants');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = jwt.verify(token, Config.jwt_secret);
            const user = await prisma.user.findFirst({ where: { id: decoded.id } });

            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = user;
        }

        next();
    } catch (error) {
        sendMessage(Constants.SlackMessageType.ERROR, error.message, error.stack);
    }
};

module.exports = { authenticateToken };