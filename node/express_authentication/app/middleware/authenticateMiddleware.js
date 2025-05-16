// ----- import services -----
import { verifyAccessToken, getUserDataFromAccessToken } from '../services/tokenService.js';

const authenticateMiddleware = async (req, res, next) => {
    try {
        const {
            [process.env.JWT_COOKIE_NAME]: accessToken,
            [process.env.REFRESH_TOKEN_COOKIE_NAME]: refreshToken
        } = req.cookies;

        const isValidAccessToken = accessToken && verifyAccessToken(accessToken);

        if (isValidAccessToken) {
            const { name: username } = getUserDataFromAccessToken(accessToken);
            req.user = { username };

            return next();
        } else if (!isValidAccessToken && refreshToken) {
            return res.redirect(303, '/refresh');
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