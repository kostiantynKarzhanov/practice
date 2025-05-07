const handleLogout = async (req, res) => {
    res.clearCookie(process.env.SESSION_COOKIE_NAME, { httpOnly: true });

    // --- First version: Destroys the session and will unset the req.session property. Once complete, the callback will be invoked.   
    return req.session.destroy((err) => {
        if (err) return next(err);

        return res.redirect(303, '/login');
    });

    // --- Second version: Clear the user from the session object and save. This will ensure that re-using the old session id does not have a logged in user

    // req.session.user = null;

    // return req.session.save((err) => {
    //     if (err) return next(err);

    //     // regenerate the session, which is good practice to help guard against forms of session fixation
    //     return req.session.regenerate((err) => {
    //         if (err) return next(err);

    //         return res.redirect(303, '/login');
    //     });
    // });
}

export {
    handleLogout
};