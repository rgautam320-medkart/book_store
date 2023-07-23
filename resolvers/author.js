const AuthorService = require("../services/author.service");

const resolvers = {
    Query: {
        author: async (_, { authorId }, { req }) => await new AuthorService(req).getAuthor({ authorId }),
        authors: async (_, __, { req }) => await new AuthorService(req).listAuthors(),
    },
    Mutation: {
        createAuthor: async (_, { createAuthor }, { req },) => await new AuthorService(req).createAuthor(createAuthor),
        updateAuthor: async (_, { authorId, updateAuthor }, { req },) => await new AuthorService(req).updateAuthor({ authorId, ...updateAuthor }),
        deleteAuthor: async (_, { authorId }, { req },) => await new AuthorService(req).deleteAuthor({ authorId }),
    },
};

module.exports = resolvers;