const directiveResolvers = {
    isAuthenticated: (next, source, context) => {
        // Implement authentication logic here
        if (!context.user) {
            throw new Error('Unauthorized! You must be logged in.');
        }
        return next();
    },
    hasRole: (next, source, { role }, context) => {
        // Implement role-based authorization logic here
        const userRole = context.user.role; // Assuming the user role is available in the context
        if (role !== userRole) {
            throw new Error(`Unauthorized! You must have role: ${role}`);
        }
        return next();
    },
}

module.exports = directiveResolvers;