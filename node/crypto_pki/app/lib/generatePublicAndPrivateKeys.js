// import built-in modules
import { generateKeyPair } from 'node:crypto';

// import custom modules
import log from './log.js';

const generatePublicAndPrivateKeys = () => {
    const keyPairOptions = {
        modulusLength: 4096, // bits, rsa key length
        publicKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standart 1
            format: 'pem'   
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptography Standart 1
            format: 'pem'
        }
    };
    
    return new Promise((resolve, reject) => {
        generateKeyPair('rsa', keyPairOptions, (err, publicKey, privateKey) => {
            if (err) reject(err);

            resolve({ publicKey, privateKey });

            log('key pair successfully created');
        });
    });
};

export default generatePublicAndPrivateKeys;