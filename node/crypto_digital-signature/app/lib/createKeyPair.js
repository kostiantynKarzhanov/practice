// import built-in modules
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

// import custom modules
import generatePublicAndPrivateKeyPair from './generatePublicAndPrivateKeyPair.js';
import log from './log.js';

const createKeyPair = async (path) => {
    try {
        const { publicKey, privateKey } = await generatePublicAndPrivateKeyPair();

        Promise.all([
            writeFile(join(path, 'publicKey.pem'), publicKey), 
            writeFile(join(path, 'privateKey.pem'), privateKey)
        ]);
    
        log('Public and Private keys saved to the corresponding files');
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default createKeyPair;
