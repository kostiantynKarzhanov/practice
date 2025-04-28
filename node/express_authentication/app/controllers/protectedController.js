const handleProtectedView = (req, res) => {
    return res.render('protected', { h1: 'Protected' });
};

export {
    handleProtectedView
};