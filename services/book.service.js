const prisma = require('../utils/prismaClient');
const { catchError } = require('../utils/utils');

class BookService {
    constructor(req) {
        this.req = req;
    }

    async getBook({ bookId }) {
        try {
            let book = await prisma.book.findFirstOrThrow({
                where: { id: bookId },
                include: {
                    BookToAuthor: {
                        select: { author: true }
                    },
                    createdBy: {
                        select: { username: true }
                    },
                    updatedBy: {
                        select: { username: true }
                    },
                }
            });

            book.created_by = book.createdBy?.username;
            book.updated_by = book.updatedBy?.username;

            book.authors = book.BookToAuthor;

            return book;
        } catch (error) {
            catchError("Error In Getting Book", error);
        }
    }

    async listBooks() {
        try {
            let books = await prisma.book.findMany({
                include: {
                    BookToAuthor: {
                        select: { author: true }
                    },
                    createdBy: {
                        select: { username: true }
                    },
                    updatedBy: {
                        select: { username: true }
                    },
                }
            });

            books.forEach(book => {
                book.created_by = book.createdBy?.username;
                book.updated_by = book.updatedBy?.username;

                book.authors = book.BookToAuthor;
            });

            return books;
        } catch (error) {
            catchError("Error In Listing Books", error);
        }
    }

    async createBook({ title, description, published_year, isbn, genre, authors }) {
        try {
            const bookQuery = await prisma.book.create({
                data: { title, description, published_year, isbn, genre, created_by: 1 }
            });

            await prisma.$transaction(
                authors.map((author) => prisma.bookToAuthor.create({ data: { bookId: bookQuery.id, authorId: author } }))
            );

            let book = await prisma.book.findFirstOrThrow({
                where: { id: bookQuery.id },
                include: {
                    BookToAuthor: {
                        select: {
                            author: true
                        }
                    },
                    createdBy: {
                        select: { username: true }
                    }
                }
            });

            book.created_by = book.createdBy?.username;
            book.authors = book.BookToAuthor;

            return book;
        } catch (error) {
            catchError("Error In Creating Book", error);
        }
    }

    async updateBook({ bookId, title, description, published_year, isbn, genre, authors }) {
        try {
            await prisma.book.update({
                where: { id: bookId },
                data: { title, description, published_year, isbn, genre, updated_by: this.req?.user?.id },
            });

            await prisma.$transaction(
                authors.map((author) => prisma.bookToAuthor.deleteMany({ where: { bookId: bookId, authorId: author } }))
            );

            await prisma.$transaction(
                authors.map((author) => prisma.bookToAuthor.create({ data: { bookId: bookId, authorId: author } }))
            );

            let book = await prisma.book.findFirstOrThrow({
                where: { id: bookId },
                include: {
                    BookToAuthor: {
                        select: {
                            author: true
                        }
                    },
                    createdBy: {
                        select: { username: true }
                    }
                }
            });

            book.created_by = book.createdBy?.username;
            book.authors = book.BookToAuthor;

            return book;
        } catch (error) {
            catchError("Error In Updating Book", error);
        }
    }

    async deleteBook({ bookId }) {
        try {
            await prisma.book.update({
                where: { id: bookId },
                data: { deleted_at: new Date(), deleted_by: this.req?.user?.id },
            });

            return {
                message: "Book Deleted Successfully",
            };
        } catch (error) {
            catchError("Error In Deleting Book", error);
        }
    }
}

module.exports = BookService;