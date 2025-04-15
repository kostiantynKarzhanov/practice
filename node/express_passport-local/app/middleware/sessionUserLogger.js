const sessionUserLogger = (req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
};

export default sessionUserLogger;