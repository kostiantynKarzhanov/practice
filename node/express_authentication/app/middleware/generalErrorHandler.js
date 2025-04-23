const generalErrorHandler = (err, req, res, next) => {
    if (err) {
        console.log('generalErrorHandler');
        console.error('debug' + err.stack);
    }

    next();
};

export default generalErrorHandler;