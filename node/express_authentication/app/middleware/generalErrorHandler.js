const generalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    return res.status(500).send('Something broke!');
};

export default generalErrorHandler;