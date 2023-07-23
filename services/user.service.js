const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Config = require('../utils/config');

const { catchError } = require('../utils/utils');
const prisma = require('../utils/prismaClient');

class UserService {
    constructor(req) {
        this.req = req;
    }

    async getMe() {
        try {
            const userData = await prisma.user.findFirstOrThrow({ where: { id: this.req?.user?.id } });

            return userData;
        } catch (error) {
            catchError("Error In Getting User", error);
        }
    }

    async listUsers() {
        try {
            const users = await prisma.user.findMany({ where: { deleted_at: null } });

            return users;
        } catch (error) {
            catchError("Error In Listing Users", error);
        }
    }

    async registerUser({ username, email, gender, age, password }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { username, email, gender, age, password: hashedPassword, created_at: new Date(), updated_at: new Date() },
            });

            return user;
        } catch (error) {
            catchError("Error In Registering User", error);
        }
    }

    async loginUser({ username, password }) {
        try {
            const user = await prisma.user.findFirstOrThrow({ where: { username: username, deleted_at: null } });

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid username or password');
            }

            const token = jwt.sign({ id: user.id }, Config.jwt_secret, { expiresIn: '1d' });

            return {
                username: user.username,
                email: user.email,
                gender: user.gender,
                age: user.age,
                token: token,
            };
        } catch (error) {
            catchError("Error In Logging In", error);
        }
    }

    async changePassword({ password, newPassword }) {
        try {
            let user = await prisma.user.findFirstOrThrow({ where: { id: this.req?.user?.id, deleted_at: null } });

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid Old Password');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user = await prisma.user.update(
                {
                    where: { id: user.id },
                    data: {
                        password: hashedPassword, updated_at: new Date()
                    },
                },
            );

            return {
                message: "Password Changed Successfully",
            };
        } catch (error) {
            catchError("Error In Change Password", error);
        }
    }

    async updateUser({ email, gender, age }) {
        try {
            let user = await prisma.user.findFirstOrThrow({ where: { id: this.req?.user?.id, deleted_at: null } });

            user = await prisma.user.update(
                {
                    where: { id: user.id },
                    data: {
                        email, gender, age, updated_at: new Date()
                    },
                },
            );

            return user;
        } catch (error) {
            catchError("Error In Updating User", error);
        }
    }

    async deleteUser({ userId }) {
        try {
            if (userId == this.req?.user?.id) {
                throw new Error("You can't delete yourself");
            }

            let user = await prisma.user.findFirstOrThrow({ where: { id: userId, deleted_at: null } });

            user = await prisma.user.update(
                {
                    where: { id: userId },
                    data: {
                        deleted_at: new Date()
                    },
                },
            );

            return { message: "User Deleted Successfully" };
        } catch (error) {
            catchError("Error In Deleting User", error);
        }
    }
}

module.exports = UserService;