// ----- import custom modules -----
import { verifyJWT, getUserDataFromJWT } from '../services/tokenService.js';

const authenticateMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const isValid = token && verifyJWT(token);

        if (isValid) {
            const { name: username } = getUserDataFromJWT(token);
            req.user = { username };

            return next();
        }

        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized request.'
        });
    } catch (err) {
        console.error(err.stack);

        return next(err);
    }
};

export default authenticateMiddleware;