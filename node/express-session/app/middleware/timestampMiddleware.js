const timestampMiddleware = (req, res, next) => {
    req.timestamp = Date.now();

    next();
}

export default timestampMiddleware;