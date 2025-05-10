const handleLogout = (req, res) => {
    // Invoking logout() will remove the req.user property and clear the login session (if any).
    return req.logout((err) => {
        if (err) return next(err);

        return res.redirect(303, '/login');
    });
};

export {
    handleLogout
};