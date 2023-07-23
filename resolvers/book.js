const BookService = require("../services/book.service");

const resolvers = {
    Query: {
        book: async (_, { bookId }, { req }) => await new BookService(req).getBook({ bookId }),
        books: async (_, __, { req }) => await new BookService(req).listBooks(),
    },
    Mutation: {
        createBook: async (_, { createBook }, { req },) => await new BookService(req).createBook(createBook),
        updateBook: async (_, { bookId, updateBook }, { req },) => await new BookService(req).updateBook({ bookId, ...updateBook }),
        deleteBook: async (_, { bookId }, { req },) => await new BookService(req).deleteBook({ bookId }),
    },
};

module.exports = resolvers;