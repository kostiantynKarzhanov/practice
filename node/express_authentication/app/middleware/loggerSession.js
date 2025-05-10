const loggerSession = (req, res, next) => {
    const { method, url } = req;

    console.log('\n' + `=== ${method.toUpperCase()} REQUEST: ${url} ===`);
    console.log('--- session: req.session ---');
    console.log(req.session);
    
    console.log('--- passport: req.user ---');
    console.log(req.user);

    return next();
};

export default loggerSession;