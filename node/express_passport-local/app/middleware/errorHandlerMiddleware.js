const errorHandlerMiddleware = (err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Something went wrong');

    return next();
};

export default errorHandlerMiddleware;