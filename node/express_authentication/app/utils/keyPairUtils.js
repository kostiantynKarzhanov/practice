// ----- import built-in modules -----
import { promisify } from 'node:util';
import { generateKeyPair } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const publicKeyPath = 'publicKey.pem';
const privateKeyPath = 'privateKey.pem';
const generateKeyPairPromise = promisify(generateKeyPair);

const createKeyPair = async (path) => {
    try {
        const { publicKey, privateKey } = await generateKeyPairPromise('rsa', {
            modulusLength: 4096, // Key size in bits
            publicKeyEncoding: {
                type: 'spki', // Must be one of 'pkcs1' (RSA only) or 'spki'.
                format: 'pem', // Must be 'pem', 'der', or 'jwk'.
            },
            privateKeyEncoding: {
                type: 'pkcs8', // Must be one of 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
                format: 'pem', // Must be 'pem', 'der', or 'jwk'.
                // cipher: 'aes-256-cbc', // If specified, the private key will be encrypted with the given cipher and passphrase using PKCS#5 v2.0 password based encryption.
                // passphrase: 'top secret', // The passphrase to use for encryption, see cipher.
            }
        });

        await Promise.all([
            writeFile(join(path, publicKeyPath), publicKey, 'utf8'),
            writeFile(join(path, privateKeyPath), privateKey, 'utf8')
        ]);
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export {
    createKeyPair
};
