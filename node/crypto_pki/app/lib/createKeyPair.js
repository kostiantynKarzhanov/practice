// import built-in modules
import fs from 'node:fs/promises';

// import custom modules
import generatePublicAndPrivateKeys from './generatePublicAndPrivateKeys.js';
import log from './log.js';

const createKeyPair = async (path) => {
    try {
        const { publicKey, privateKey } = await generatePublicAndPrivateKeys();

        await Promise.all([fs.writeFile(`${path}/publicKey.pem`, publicKey, 'utf8'), fs.writeFile(`${path}/privateKey.pem`, privateKey, 'utf8')]);

        log('Public and Private keys saved to the corresponding files');
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default createKeyPair;
