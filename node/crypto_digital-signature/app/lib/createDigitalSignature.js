// import built-in modules
import { readFile } from 'node:fs/promises';
import { privateEncrypt } from 'node:crypto';

// import custom modules
import generateDigest from './generateDigest.js';
import log from './log.js';

const createDigitalSignature = async (pathFile, pathPrivateKey) => {
    try {
        const digest = generateDigest(pathFile);

        log('message digest for digital signature was generated');

        const privateKey = await readFile(pathPrivateKey);
        const bufferSignature = privateEncrypt(privateKey, digest);

        log('digital signature was created by encrypting the hash of the message with private key');

        return bufferSignature;
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default createDigitalSignature;