const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(req) {
        this.req = req;
    }

    async getMe(prisma) {
        try {
            if (!this.req.user.id) {
                throw new Error('Not Authenticated');
            }

            const userData = await prisma.user.findFirst({ where: { id: this.req.user.id } });

            return userData;
        } catch (error) {
            throw error;
        }
    }

    async listUsers(prisma) {
        try {
            const users = await prisma.user.findMany();

            return users;
        } catch (error) {
            throw error;
        }
    }

    async registerUser(prisma, { username, email, gender, age, password }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { username, email, gender, age, password: hashedPassword, created_at: new Date(), updated_at: new Date() },
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(prisma, { username, password }) {
        try {
            const user = await prisma.user.findFirst({ where: { username } });

            if (!user) {
                throw new Error('Invalid username or password');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid username or password');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return {
                username: user.username,
                email: user.email,
                gender: user.gender,
                age: user.age,
                token: token,
            };
        } catch (error) {
            throw error;
        }
    }

    async changePassword(prisma, { password, newPassword }) {
        try {
            let user = await prisma.user.findFirst({ where: { id: this.req?.user?.id } });

            if (!user) {
                throw new Error('User not found');
            }

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
            throw error;
        }
    }

    async updateUser(prisma, { email, gender, age }) {
        try {
            let user = await prisma.user.findFirst({ where: { id: this.req?.user?.id } });

            if (!user) {
                throw new Error('User not found');
            }

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
            throw error;
        }
    }
}

module.exports = UserService;