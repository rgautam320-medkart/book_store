const resolvers = {
    Query: {
        authors: async (_, __, { prisma }) => {
            const authors = await prisma.author.findMany();
            return authors;
        },
    },
    Author: {
        books: async (parent, _, { prisma }) => {
            const books = await prisma.bookToAuthor
                .findUnique({ where: { authorId: parent.id } })
                .book();
            return books;
        },
    },
};

module.exports = resolvers;