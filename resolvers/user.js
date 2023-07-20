const UserService = require('../services/user.service');

const resolvers = {
    Query: {
        me: async (_, __, { prisma, req }) => await new UserService(req).getMe(prisma),
        users: async (_, __, { prisma, req }) => await new UserService(req).listUsers(prisma),
    },
    Mutation: {
        register: async (_, { registerUser }, { prisma, req }) => await new UserService(req).registerUser(prisma, registerUser),
        login: async (_, { username, password }, { prisma, req }) => await new UserService(req).loginUser(prisma, { username, password }),
        updateUser: async (_, { updateUser }, { prisma, req }) => await new UserService(req).updateUser(prisma, updateUser),
        changePassword: async (_, { password, newPassword }, { prisma, req }) => await new UserService(req).changePassword(prisma, { password, newPassword }),
        deleteUser: async (_, { userId }, { prisma, req }) => await new UserService(req).deleteUser(prisma, { userId }),
    },
};

module.exports = resolvers;