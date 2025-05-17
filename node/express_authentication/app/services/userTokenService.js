// ----- import services -----
import { getUserByName, verifyUser } from './userService.js';
import { getAccessTokenCookie, getRefreshTokenCookie } from './tokenService.js';

const loginUser = async (name, password) => {
    try {
        // find and verify user
        const user = await getUserByName(name);
        const isVerified = await verifyUser(password, user);

        if (!isVerified) return null;

        const accessTokenCookie = getAccessTokenCookie(user);
        const refreshTokenCookie = await getRefreshTokenCookie(user);

        return [accessTokenCookie, refreshTokenCookie];
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export {
    loginUser
};
