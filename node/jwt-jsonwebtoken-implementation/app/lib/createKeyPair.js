// import built-in modules
import { writeFile } from 'node:fs/promises';

// import custom modules
import generateKeyPairPromise from './generateKeyPairPromise.js';

const createKeyPair = (pathPublicKey, pathPrivateKey) => {
    return generateKeyPairPromise()
        .then(({ publicKey, privateKey }) => {
            return Promise.all([
                writeFile(pathPublicKey, publicKey), 
                writeFile(pathPrivateKey, privateKey)
            ]);
        }).catch(err => {
            console.error(err.stack);
            throw err;
        })
};

export default createKeyPair;
