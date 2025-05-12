const handleProtectedView = (req, res) => {
    const { name: username } = req.user;

    return res.render('protected', { h1: 'Protected', username });
};

export {
    handleProtectedView
};