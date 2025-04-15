// import built-in modules
import { publicDecrypt } from 'node:crypto';
import { readFile } from 'node:fs/promises';

// import custom modules
import generateDigest from './generateDigest.js';

const verifyDigitalSignature = async (pathFile, pathPublicKey, bufferSignature) => {
    try {
        const publicKey = await readFile(pathPublicKey);
        const decryptedDigest = publicDecrypt(publicKey, bufferSignature);

        const digest = generateDigest(pathFile);

        return decryptedDigest.toString('utf8') === digest;
    } catch (err) {
        console.error(err);
    }
};

export default verifyDigitalSignature;