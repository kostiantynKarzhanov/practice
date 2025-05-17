// ----- import config modules -----
import { refreshTokenName } from '../config/defaultsConfig.js';

// ----- import services -----
import { getUserIdFromRefreshToken, getAccessTokenCookie, getUpdatedRefreshTokenCookie } from '../services/tokenService.js';
import { getUserById } from '../services/userService.js';

const handleTokenRefresh = async (req, res, next) => {
    try {
        const { [refreshTokenName]: refreshToken } = req.cookies;
        const userId = await getUserIdFromRefreshToken(refreshToken);
        const user = userId && await getUserById(userId);
                
        if (user) {
            const accessTokenCookie = getAccessTokenCookie(user);
            const refreshTokenCookie = await getUpdatedRefreshTokenCookie(refreshToken);
            
            res.cookie(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
            res.cookie(refreshTokenCookie.name, refreshTokenCookie.value, refreshTokenCookie.options);
            
            return res.redirect(303, '/protected');
        }

        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired refresh token.'
        });
    } catch (err) {
        return next(err);
    }
};

export {
    handleTokenRefresh
}