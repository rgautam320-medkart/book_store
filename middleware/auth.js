const directiveResolvers = {
    isAuthenticated: (next, source, context, ctx) => {
        console.log(source);
        // return next();
        throw new Error("H");
    },
    hasRole: (next, source, { role }, ctx) => {
        const user = {
            role: "MANAGER"
        };
        if (role === user.role) return next();
        throw new Error(`Must have role: ${role}, you have role: ${user.role}`)
    }
}

module.exports = directiveResolvers;