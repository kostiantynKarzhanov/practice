// import built-in modules
import { writeFile } from 'node:fs/promises';

// import custom modules
import generateKeyPairPromise from './generateKeyPairPromise.js';
import log from './log.js';

const saveKeyPairToFile = (pathPublicKey, pathPrivateKey) => {
    return generateKeyPairPromise()
        .then(({ publicKey, privateKey }) => {
            return Promise.all([writeFile(pathPublicKey, publicKey), writeFile(pathPrivateKey, privateKey)]);
        })
        .then(() => {
            log('public and private keys were saved to corresponding files');
        })
        .catch(err => {
            console.error(err.stack);
            throw err;
        })
};

export default saveKeyPairToFile;