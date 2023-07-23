const { sendLog } = require('./utils');
const { PrismaClient } = require('@prisma/client');

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

module.exports = prisma;