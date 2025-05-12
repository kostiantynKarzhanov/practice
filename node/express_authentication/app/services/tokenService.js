// ----- import custom modules -----
import { createDigitalSignature, verifyDigitalSignature } from '../utils/digitalSignatureUtils.js';

const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url'); 
const decodeBase64Url = (str) => JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));

const createJWT = (user) => {
    try {
        const { id: sub, name } = user;
        const iat = Date.now();
        const exp = iat + Number(process.env.JWT_TTL_MS);

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

const verifyJWT = (jwt) => {
    const [ headerBase64Url, payloadBase64Url, jwtSignatureBase64Url ] = jwt.split('.');
    
    if (!headerBase64Url || !payloadBase64Url || !jwtSignatureBase64Url) return false;

    const jwtHeaderPayloadBase64Url = `${headerBase64Url}.${payloadBase64Url}`;

    const isVerified = verifyDigitalSignature(jwtHeaderPayloadBase64Url, jwtSignatureBase64Url);

    if (!isVerified) return false;

    const { exp } = decodeBase64Url(payloadBase64Url);

    return exp > Date.now();
};

const getUserDataFromJWT = (jwt) => {
    const payloadBase64Url = jwt.split('.')[1];

    return decodeBase64Url(payloadBase64Url);
};

const createJWTCookie = (value) => {
    return {
        name: process.env.JWT_COOKIE_NAME,
        value,
        options: {
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.JWT_TTL_MS)
        }
    }
};

export {
    createJWT,
    verifyJWT,
    createJWTCookie,
    getUserDataFromJWT
};