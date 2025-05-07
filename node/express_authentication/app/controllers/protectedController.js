const handleProtectedView = (req, res) => {
    const username = req.session.user;
    const sessionOriginalMaxAgeSec = req.session.cookie.originalMaxAge / 1000;
    const sessionMaxAgeBeforeReloadSec = req.session.cookie.maxAge / 1000;

    return res.render('protected', { h1: 'Protected', username, sessionOriginalMaxAgeSec, sessionMaxAgeBeforeReloadSec });
};

export {
    handleProtectedView
};