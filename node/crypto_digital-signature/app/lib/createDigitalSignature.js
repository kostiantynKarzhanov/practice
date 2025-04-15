// import built-in modules
import { readFile } from 'node:fs/promises';
import { privateEncrypt } from 'node:crypto';

// import custom modules
import generateDigest from './generateDigest.js';

const createDigitalSignature = async (pathFile, pathPrivateKey) => {
    try {
        const digest = generateDigest(pathFile);
        const privateKey = await readFile(pathPrivateKey);
        const bufferSignature = privateEncrypt(privateKey, digest);

        return bufferSignature;
    } catch (err) {
        console.error(err);
    }
};

export default createDigitalSignature;