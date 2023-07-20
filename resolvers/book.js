const resolvers = {
    Query: {
        books: async (_, __, { prisma }) => {
            const books = await prisma.book.findMany();
            return books;
        },
    },
    Book: {
        authors: async (parent, _, { prisma }) => {
            const authors = await prisma.bookToAuthor
                .findUnique({ where: { bookId: parent.id } })
                .author();
            return authors;
        },
    },
};

module.exports = resolvers;