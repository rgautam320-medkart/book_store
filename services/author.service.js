const prisma = require('../utils/prismaClient');
const { catchError } = require('../utils/utils');

class AuthorService {
    constructor(req) {
        this.req = req;
    }

    async getAuthor({ authorId }) {
        try {
            let authorData = await prisma.author.findFirstOrThrow({ where: { id: authorId, deleted_at: null }, include: { createdBy: true, updatedBy: true } });

            authorData.created_by = authorData.createdBy?.username;
            authorData.updated_by = authorData.updatedBy?.username;

            return authorData;
        } catch (error) {
            catchError("Error In Getting Author", error);
        }
    }

    async listAuthors(prisma) {
        try {
            const authors = await prisma.author.findMany({ where: { deleted_at: null }, include: { createdBy: true, updatedBy: true } });

            authors.forEach(author => {
                author.created_by = author.createdBy?.username;
                author.updated_by = author.updatedBy?.username;
            });

            return authors;
        } catch (error) {
            catchError("Error In Listing Authors", error);
        }
    }

    async createAuthor({ name, email, dob, language, biography, website }) {
        try {
            const author = await prisma.author.create({
                data: { name, email, dob: new Date(dob), language, biography, website, created_by: 1 },
                include: { createdBy: true }
            });

            author.created_by = author.createdBy?.username;

            return author;
        } catch (error) {
            catchError("Error In Creating Author", error);
        }
    }

    async updateAuthor({ authorId, name, dob, language, biography, website }) {
        try {
            const author = await prisma.author.update({
                where: { id: authorId },
                data: { name, dob: new Date(dob), language, biography, website, updated_by: 1 },
                include: { createdBy: true }
            });

            author.created_by = author.createdBy?.username;

            return author;
        } catch (error) {
            catchError("Error In Updating Author", error);
        }
    }

    async deleteAuthor({ authorId }) {
        try {
            await prisma.author.update({
                where: { id: authorId },
                data: { deleted_at: new Date(), deleted_by: 1 },
            });

            return {
                message: "Author Deleted Successfully",
            };
        } catch (error) {
            catchError("Error In Deleting Author", error);
        }
    }
}

module.exports = AuthorService;