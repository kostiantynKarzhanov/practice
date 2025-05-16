// ----- import built-in modules -----
import { randomBytes } from 'node:crypto';

// ----- import dal -----
import { createRefreshToken, findRefreshTokenByValue, deleteRefreshToken } from '../dal/tokenDAL.js';

// ----- import utils -----
import { createDigitalSignature, verifyDigitalSignature } from '../utils/digitalSignatureUtils.js';

// ----- access token functions -----
const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const decodeBase64Url = (str) => JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));

const generateAccessToken = (user) => {
    try {
        const { id: sub, name } = user;
        const iat = Date.now();
        const exp = iat + Number(process.env.JWT_TTL_MS || 60000);

        const headerObj = { alg: 'RS256', typ: 'JWT' };
        const payloadObj = { sub, name, iat, exp };

        const headerBase64Url = encodeBase64Url(headerObj);
        const payloadBase64Url = encodeBase64Url(payloadObj);

        const jwtHeaderPayloadBase64Url = `${headerBase64Url}.${payloadBase64Url}`;
        const jwtSignatureBase64Url = createDigitalSignature(jwtHeaderPayloadBase64Url);

        return `${jwtHeaderPayloadBase64Url}.${jwtSignatureBase64Url}`;
    } catch (err) {
        console.log(err.stack);

        throw err;
    }
};

const verifyAccessToken = (token) => {
    const [headerBase64Url, payloadBase64Url, jwtSignatureBase64Url] = token.split('.');

    if (!headerBase64Url || !payloadBase64Url || !jwtSignatureBase64Url) return false;

    const jwtHeaderPayloadBase64Url = `${headerBase64Url}.${payloadBase64Url}`;
    const isVerified = verifyDigitalSignature(jwtHeaderPayloadBase64Url, jwtSignatureBase64Url);

    if (!isVerified) return false;

    const { exp } = decodeBase64Url(payloadBase64Url);

    return exp > Date.now();
};

const getUserDataFromAccessToken = (token) => {
    const payloadBase64Url = token.split('.')[1];

    return decodeBase64Url(payloadBase64Url);
};

const issueAccessTokenCookie = (value) => {
    return {
        name: process.env.JWT_COOKIE_NAME,
        value,
        options: {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.JWT_TTL_MS || 60000)
        }
    };
};

// ----- refresh token functions -----
const generateRefreshToken = async (user) => {
    try {
        const { id: userId } = user;
        const value = randomBytes(64).toString('hex');
        const expireAt = Date.now() + Number(process.env.REFRESH_TOKEN_TTL_MS);

        const refreshToken = await createRefreshToken(userId, value, expireAt);

        return refreshToken.value;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const getUserIdFromRefreshToken = async (token) => {
    try {
        const refreshToken = await findRefreshTokenByValue(token);

        if (!refreshToken || refreshToken.expireAt < Date.now()) return null;

        return refreshToken.userId;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const removeRefreshToken = (token) => deleteRefreshToken(token);

const issueRefreshTokenCookie = (value) => {
    return {
        name: process.env.REFRESH_TOKEN_COOKIE_NAME,
        value,
        options: {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.REFRESH_TOKEN_TTL_MS || 180000)
        }
    };
};

export {
    generateAccessToken,
    verifyAccessToken,
    getUserDataFromAccessToken,
    issueAccessTokenCookie,
    generateRefreshToken,
    getUserIdFromRefreshToken,
    removeRefreshToken,
    issueRefreshTokenCookie,
};