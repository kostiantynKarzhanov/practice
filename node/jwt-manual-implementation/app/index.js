// import built-in modules
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';
import log from './lib/log.js';

// ----- version-1: NOT correct implementation -----
// (token signature will be different from https://jwt.io/)
// log('----- version-1 is running -----');
// import createJWT from './lib/createJWT_v1.js';
// import verifyJWTSignature from './lib/verifyJWTSignature_v1.js';

// ----- version-2: the correct implementation -----
// (token is exactly the same as from https://jwt.io/)
log('----- version-2 is running -----');
import createJWT from './lib/createJWT_v2.js';
import verifyJWTSignature from './lib/verifyJWTSignature_v2.js';

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

const main = async () => {
    try {
        await createKeyPair(pathPublicKey, pathPrivateKey);
        await createJWT(headerObj, payloadObj, pathPrivateKey, pathJWT);

        const isValid = await verifyJWTSignature(pathPublicKey, pathJWT);
        log('--- token status: ' + (isValid ? 'valid' : 'NOT valid'));
    }
    catch (err) {
        console.error(err.stack);
    }
}

main();