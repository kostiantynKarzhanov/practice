// import built-in modules
import { generateKeyPair } from 'node:crypto';

// import custom modules
import log from './log.js';

const generateKeyPairPromise = () => {
    return new Promise((resolve, reject) => {
        generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        }, (err, publicKey, privateKey) => {
            if (err) reject(err);

            resolve({ publicKey, privateKey });
            log('key pair succesfully generated');
        })
    });
};

export default generateKeyPairPromise;
