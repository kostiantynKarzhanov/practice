// import built-in modules
import base64url from 'base64url';

// import custom modules
import generateHexDigest from './generateHexDigest.js'
import generateDigitalSignature from './generateDigitalSignature.js'
import log from './log.js';

const createJWT = (headerObj, payloadObj, pathPrivateKey) => {
    const headerJSON = JSON.stringify(headerObj);
    const payloadJSON = JSON.stringify(payloadObj);
    
    log(`- Raw header: ${headerJSON}`);
    log(`- Raw payload: ${payloadJSON}`);

    const headerBase64url = base64url.encode(headerJSON);
    const payloadBase64url = base64url.encode(payloadJSON);

    log(`-- Base64url header: ${headerBase64url}`);
    log(`-- Base64url payload: ${payloadBase64url}`);

    const headerPayloadJWT = headerBase64url.concat('.', payloadBase64url);
    const digest = generateHexDigest(headerPayloadJWT);

    log(`--- Digest from Base64url encoded "header.payload": ${digest}`);

    return generateDigitalSignature(pathPrivateKey, digest)
        .then(signature => {
            const signatureBase64url = base64url.encode(signature);

            log(`---- Digital Signature (Base64url encoded): ${signatureBase64url}`);

            return headerPayloadJWT.concat('.', signatureBase64url);
        })
        .catch(err => {
            console.error(err.stack);
            throw err;
        });
};

export default createJWT;