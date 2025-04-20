// import built-in modules
import { publicDecrypt } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import base64url from 'base64url';

// import custom modules
import generateHexDigest from './generateHexDigest.js';

const verifyJWTSignature = (pathPublicKey, pathJWT) => {
    return Promise.all([readFile(pathPublicKey), readFile(pathJWT)])
        .then(([publicKeyBuffer, bufferJWT]) => {
            const JWT = bufferJWT.toString('utf8');
            const [headerBase64url, payloadBase64url, signatureBase64url] = JWT.split('.');

            const headerPayloadJWT = headerBase64url.concat('.', payloadBase64url);
            const digest = generateHexDigest(headerPayloadJWT);

            const signatureBase64 = base64url.toBase64(signatureBase64url);
            const signature = Buffer.from(signatureBase64, 'base64');

            const digestFromSignatureBuffer = publicDecrypt(publicKeyBuffer, signature);
            return digest === digestFromSignatureBuffer.toString('utf8');
        })
};

export default verifyJWTSignature;