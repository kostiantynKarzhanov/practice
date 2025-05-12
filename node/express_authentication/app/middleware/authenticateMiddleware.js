// ----- import custom modules -----
import { verifyJWT, decodeJWTPayload } from '../utils/tokenService.js';

const authenticateMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const isVerified = token && verifyJWT(token);

        if (isVerified) {
            req.user = decodeJWTPayload(token);
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