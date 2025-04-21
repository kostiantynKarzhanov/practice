// import built-in modules
import { readFile } from 'node:fs/promises';
import { createVerify } from 'node:crypto';

const verifyJWTSignature = (pathPublicKey, pathJWT) => {
    return Promise.all([readFile(pathPublicKey), readFile(pathJWT)])
        .then(([publicKeyBuffer, bufferJWT]) => {
            const JWT = bufferJWT.toString('utf8');
            const [headerBase64url, payloadBase64url, signatureBase64url] = JWT.split('.');

            const headerPayloadJWT = headerBase64url.concat('.', payloadBase64url);
            const signatureBuffer = Buffer.from(signatureBase64url, 'base64url');

            const verifyObj = createVerify('RSA-SHA256');
            verifyObj.write(headerPayloadJWT);
            verifyObj.end();

            return verifyObj.verify(publicKeyBuffer, signatureBuffer);
        })
        .catch()
};

export default verifyJWTSignature;