const timestampMiddleware = (req, res, next) => {
    req.timestamp = Date.now();

    return next();
}

export default timestampMiddleware;