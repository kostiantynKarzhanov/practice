import passport from 'passport';

const authenticateMiddleware = passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login'
});

export default authenticateMiddleware;