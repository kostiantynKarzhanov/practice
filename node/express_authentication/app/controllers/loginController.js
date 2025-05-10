// ----- import built-in modules -----
import passport from 'passport';

const renderLoginView = (req, res) => {
    return res.render('login', { h1: 'Login', action: 'login' });
};

const handleLogin = passport.authenticate(
    'local', 
    { successRedirect: '/protected', failureRedirect: '/login', failureMessage: true }
);

export { 
    renderLoginView, 
    handleLogin 
};