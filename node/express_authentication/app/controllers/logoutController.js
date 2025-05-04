const handleLogout = (req, res) => {
    // You cannot directly force the browser to delete a cookie from a server response — but you can instruct it to expire the cookie immediately.
    // clearCookie sets a cookie with a given name to expiration date in the past: 01 Jan 1970 00:00:00 GMT
    res.clearCookie('auth', { httpOnly: true });

    return res.redirect(303, '/login');
};

export {
    handleLogout
};