// ----- import services -----
import { getUserIdFromRefreshToken, removeRefreshToken } from '../services/tokenService.js';
import { getUserById } from '../services/userService.js';
import { getAccessCookies } from '../services/userTokenService.js';

const handleTokenRefresh = async (req, res, next) => {
    try {
        const { [process.env.REFRESH_TOKEN_COOKIE_NAME]: refreshToken } = req.cookies;
        const userId = await getUserIdFromRefreshToken(refreshToken);
        const user = userId && await getUserById(userId);
                
        // remove old refresh token
        await removeRefreshToken(refreshToken);

        if (user) {
            const [accessTokenCookie, refreshTokenCookie] = await getAccessCookies(user);

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