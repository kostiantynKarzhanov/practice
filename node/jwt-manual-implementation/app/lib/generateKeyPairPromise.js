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
            if (err) return reject(err);

            log('key pair succesfully generated');
            
            return resolve({ publicKey, privateKey });
        })
    });
};

export default generateKeyPairPromise;
