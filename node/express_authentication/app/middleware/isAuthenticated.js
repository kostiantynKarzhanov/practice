const isAuthenticated = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) return next();

        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized request.'
        });
    } catch (err) {
        return next(err);
    }
};

export default isAuthenticated;