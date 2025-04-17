// import built-in modules
import { publicDecrypt } from 'node:crypto';
import { readFile } from 'node:fs/promises';

// import custom modules
import generateDigest from './generateDigest.js';
import log from './log.js';

const verifyDigitalSignature = async (pathFile, pathPublicKey, bufferSignature) => {
    try {
        const publicKey = await readFile(pathPublicKey);
        const decryptedDigest = publicDecrypt(publicKey, bufferSignature);

        log('hash of the message was decrypted with public key');

        const digest = generateDigest(pathFile);

        log('message digest was generated and ready for comparison');

        return decryptedDigest.toString('utf8') === digest;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default verifyDigitalSignature;