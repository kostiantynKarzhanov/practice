// ----- import built-in modules -----
import { createSign, createVerify } from 'node:crypto';

const createDigitalSignature = (data) => {
    const signObj = createSign(process.env.JWT_ALG);

    signObj.write(data);
    signObj.end();

    return signObj.sign(process.env.PRIVATE_KEY, 'base64url');
};

const createJWT = (user) => {
    try {
        const { id, name, dateCreated } = user;

        const headerObj = { alg: process.env.JWT_HEADER_ALG, typ: 'JWT' };
        const payloadObj = { sub: id, name, iat: dateCreated.getTime() };

        const headerJSON = JSON.stringify(headerObj);
        const payloadJSON = JSON.stringify(payloadObj);

        const headerBase64Url = Buffer.from(headerJSON).toString('base64url');
        const payloadBase64Url = Buffer.from(payloadJSON).toString('base64url');

        const jwtHeaderPayloadBase64Url = headerBase64Url.concat('.', payloadBase64Url);
        const jwtSignatureBase64Url = createDigitalSignature(jwtHeaderPayloadBase64Url);

        const token = jwtHeaderPayloadBase64Url.concat('.', jwtSignatureBase64Url);

        return token;
    } catch (err) {
        console.log(err.stack);

        throw err;
    }
};

const verifyJWT = (jwt) => {
    const [ headerBase64Url, payloadBase64Url, jwtSignatureBase64Url ] = jwt.split('.');
    const jwtHeaderPayloadBase64Url = headerBase64Url.concat('.', payloadBase64Url);

    const verifyObj = createVerify(process.env.JWT_ALG);

    verifyObj.write(jwtHeaderPayloadBase64Url);
    verifyObj.end();

    return verifyObj.verify(process.env.PUBLIC_KEY, jwtSignatureBase64Url, 'base64url');
};

const createTokenCookie = (value) => {
    return {
        name: process.env.JWT_COOKIE_NAME,
        value,
        options: {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.JWT_COOKIE_MAX_AGE_MS)
        }
    }
};

const decodeJWTPayload = (jwt) => {
    const payloadBase64Url = jwt.split('.')[1];

    const payloadJSON = Buffer.from(payloadBase64Url, 'base64url').toString('utf8');
    const payloadObj = JSON.parse(payloadJSON);

    return payloadObj;
};

export {
    createJWT,
    verifyJWT,
    createTokenCookie,
    decodeJWTPayload
};