// ----- import built-in modules -----
import { promisify } from 'node:util';
import { generateKeyPair } from 'node:crypto';

const generateKeyPairPromise = promisify(generateKeyPair);

const createKeyPair = async () => {
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

        process.env.PUBLIC_KEY = publicKey;
        process.env.PRIVATE_KEY = privateKey;

        console.log(process.env.PUBLIC_KEY);
        console.log(process.env.PRIVATE_KEY);
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export default createKeyPair;