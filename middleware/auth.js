const jwt = require('jsonwebtoken');
const Config = require('../utils/config');
const { noAuthMethods } = require('./paths');
const { PrismaClient } = require('@prisma/client');

async function jwtMiddleware(req, res, next) {
    if (req.method == 'GET' || !req.operationName) {
        return next();
    }

    if (req.operationName && noAuthMethods.includes(req.operationName)) {
        return next();
    }

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, Config.jwt_secret);

        const user = await new PrismaClient().user.findFirstOrThrow({ where: { id: decoded.id } });

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
}

module.exports = jwtMiddleware;
