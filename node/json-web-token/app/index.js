// import built-in modules
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';
import createJWT from './lib/createJWT.js';
import verifyJWTSignature from './lib/verifyJWTSignature.js';
import log from './lib/log.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathPublicKey = join(__dirname, 'keys', 'publicKey.pem');
const pathPrivateKey = join(__dirname, 'keys', 'privateKey.pem');
const pathJWT = join(__dirname, 'token', 'json-web-token.txt');

const headerObj = {
    "alg": "RS256",
    "typ": "JWT"
};

const payloadObj = {
    "sub": "123",
    "name": "John Doe",
    "admin": false,
    "iat": Date.now()
};

const main = () => {
    createKeyPair(pathPublicKey, pathPrivateKey)
        .then(() => {
            return createJWT(headerObj, payloadObj, pathPrivateKey, pathJWT);
        })
        .then(() => {
            return verifyJWTSignature(pathPublicKey, pathJWT);
        })
        .then(isVerified => {
            log('--- token status: ' + (isVerified ? 'valid' : 'NOT valid'));
        })
        .catch(err => {
            console.error(err.stack);
        });
}

main();