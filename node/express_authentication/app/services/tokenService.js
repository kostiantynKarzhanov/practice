// ----- import custom modules -----
import { createDigitalSignature, verifyDigitalSignature } from 'digitalSignatureUtils.js';

const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url'); 
const decodeBase64Url = (str) => JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));

const createJWT = (user) => {
    try {
        const { id: sub, name } = user;
        const iat = Date.now();
        const exp = iat + process.env.JWT_TTL_MS;

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

    return verifyDigitalSignature(jwtHeaderPayloadBase64Url, jwtSignatureBase64Url)
};

const decodeJWTPayload = (jwt) => {
    const payloadBase64Url = jwt.split('.')[1];

    return decodeBase64Url(payloadBase64Url);
};

const createTokenCookie = (value) => {
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
    createTokenCookie,
    decodeJWTPayload
};