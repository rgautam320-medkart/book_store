// Import Resolvers

const User = require('../typeDefs/User');
const Book = require('../typeDefs/Book');
const Author = require('../typeDefs/Author');

const typeDefs = [
    User.typeDef,
    Book.typeDef,
    Author.typeDef
];

module.exports = typeDefs;