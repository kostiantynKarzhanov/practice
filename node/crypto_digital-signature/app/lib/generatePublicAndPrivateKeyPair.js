// import built-in modules
import { generateKeyPair } from 'node:crypto';

const generatePublicAndPrivateKeyPair = () => {
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
        });
    });
};

export default generatePublicAndPrivateKeyPair;