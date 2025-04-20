// import built-in modules
import { readFile } from 'node:fs/promises';
import { createVerify } from 'node:crypto';

// import custom modules
import generateHexDigest from './generateHexDigest.js';

const verifyJWTSignature = (pathPublicKey, pathJWT) => {
    return Promise.all([readFile(pathPublicKey), readFile(pathJWT)])
        .then(([publicKeyBuffer, bufferJWT]) => {
            const JWT = bufferJWT.toString('utf8');
            const [headerBase64url, payloadBase64url, signatureBase64url] = JWT.split('.');

            const headerPayloadJWT = headerBase64url.concat('.', payloadBase64url);
            const digest = generateHexDigest(headerPayloadJWT);
            
            const signatureBuffer = Buffer.from(signatureBase64url, 'base64url');

            const verifyObj = createVerify('RSA-SHA256');
            verifyObj.update(digest);

            return verifyObj.verify(publicKeyBuffer, signatureBuffer);
        })
        .catch()
};

export default verifyJWTSignature;