const sessionUserLogger = (req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    
    return next();
};

export default sessionUserLogger;