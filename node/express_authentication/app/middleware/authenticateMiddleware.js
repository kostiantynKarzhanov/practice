// ----- import config modules -----
import { accessTokenName, refreshTokenName } from '../config/defaultsConfig.js';

// ----- import services -----
import { verifyAccessToken, getUserDataFromAccessToken } from '../services/accessTokenService.js';

const authenticateMiddleware = async (req, res, next) => {
    try {
        const {
            [accessTokenName]: accessToken,
            [refreshTokenName]: refreshToken
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