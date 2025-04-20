// import built-in modules
import { readFile } from 'node:fs/promises';
import { getHashes, createSign } from 'node:crypto';

const generateDigitalSignature = (pathPrivateKey, digest) => {
    return readFile(pathPrivateKey)
        .then(privateKeyBuffer => {
            // console.log(getHashes());
            const signObj = createSign('RSA-SHA256');
            signObj.update(digest);
            signObj.end();

            return signObj.sign(privateKeyBuffer);
        })
        .catch(err => {
            console.error(err.stack);
            throw err;
        })
}

export default generateDigitalSignature;

