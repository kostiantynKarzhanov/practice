const generalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
};

export default generalErrorHandler;