// import built-in modules
import { readFile } from 'node:fs/promises';
import { privateEncrypt } from 'node:crypto';

const generateDigitalSignature = (pathPrivateKey, digest) => {
    return readFile(pathPrivateKey)
        .then(privateKeyBuffer => privateEncrypt(privateKeyBuffer, digest))
        .catch(err => {
            console.error(err.stack);
            throw err;
        })
}

export default generateDigitalSignature;

