function ErrorWrapper(func) {
    return function (...args) {
        try {
            const result = func(...args);
            return result;
        } catch (error) {
            console.error('An error occurred');
        }
    };
}

module.exports = ErrorWrapper;