// import built-in modules
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// import custom modules
import saveKeyPairToFile from './lib/saveKeyPairToFile.js';
import createJWT from './lib/createJWT.js';
import log from './lib/log.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathPublicKey = join(__dirname, 'keys', 'publicKey.pem');
const pathPrivateKey = join(__dirname, 'keys', 'privateKey.pem');

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
    saveKeyPairToFile(pathPublicKey, pathPrivateKey)
        .then(() => {
            return createJWT(headerObj, payloadObj, pathPrivateKey);
        })
        .then(jwt => {
            log('----- JSON Web Token -----');

            console.log(jwt);
        })
        .catch(err => {
            console.error(err.stack);
        });
}

main();