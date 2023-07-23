const UserService = require('../services/user.service');

const resolvers = {
    Query: {
        me: async (_, __, { req }) => await new UserService(req).getMe(),
        users: async (_, __, { req }) => await new UserService(req).listUsers(),
    },
    Mutation: {
        register: async (_, { registerUser }, { req }) => await new UserService(req).registerUser(registerUser),
        login: async (_, { username, password }, { req }) => await new UserService(req).loginUser({ username, password }),
        updateUser: async (_, { updateUser }, { req }) => await new UserService(req).updateUser(updateUser),
        changePassword: async (_, { password, newPassword }, { req }) => await new UserService(req).changePassword({ password, newPassword }),
        deleteUser: async (_, { userId }, { req }) => await new UserService(req).deleteUser({ userId }),
    },
};

module.exports = resolvers;