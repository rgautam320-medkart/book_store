const AuthorService = require("../services/author.service");

const resolvers = {
    Query: {
        author: async (_, { authorId }, { prisma, req }) => await new AuthorService(req).getAuthor(prisma, { authorId }),
        authors: async (_, __, { prisma, req }) => await new AuthorService(req).listAuthors(prisma),
    },
    Mutation: {
        createAuthor: async (_, { createAuthor }, { prisma, req },) => await new AuthorService(req).createAuthor(prisma, createAuthor),
        updateAuthor: async (_, { authorId, updateAuthor }, { prisma, req },) => await new AuthorService(req).updateAuthor(prisma, { authorId, ...updateAuthor }),
        deleteAuthor: async (_, { authorId }, { prisma, req },) => await new AuthorService(req).deleteAuthor(prisma, { authorId }),
    },
};

module.exports = resolvers;