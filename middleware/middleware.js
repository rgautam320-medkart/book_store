const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findFirst({ where: { id: decoded.id } });

            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = user;
        }

        next();
    } catch (error) {
        throw error;
    }
};

module.exports = { authenticateToken };