// Import Models

const userResolvers = require('../resolvers/user');
const bookResolvers = require('../resolvers/book');
const authorResolvers = require('../resolvers/author');

const resolvers = [
    userResolvers,
    bookResolvers,
    authorResolvers
];

module.exports = resolvers;