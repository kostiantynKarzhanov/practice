// import built-in modules
import { generateKeyPair } from 'node:crypto';

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
        });
    });
};

export default generateKeyPairPromise;