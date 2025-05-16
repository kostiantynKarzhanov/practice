// ----- import services -----
import { getUserByName, verifyUser } from './userService.js';
import { generateAccessToken, generateRefreshToken, issueAccessTokenCookie, issueRefreshTokenCookie } from './tokenService.js';

const getAccessCookies = async (user) => {
    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // get cookies
    const accessTokenCookie = issueAccessTokenCookie(accessToken);
    const refreshTokenCookie = issueRefreshTokenCookie(refreshToken);

    return [accessTokenCookie, refreshTokenCookie];
};

const loginUser = async (name, password) => {
    try {
        // find and verify user
        const user = await getUserByName(name);
        const isVerified = await verifyUser(password, user);

        if (!isVerified) return null;

        const accessCookies = await getAccessCookies(user);

        return accessCookies;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export {
    getAccessCookies,
    loginUser
};
