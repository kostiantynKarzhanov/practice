// import built-in modules
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

// import custom modules
import generatePublicAndPrivateKeyPair from './generatePublicAndPrivateKeyPair.js';

const createKeyPair = async (path) => {
    const { publicKey, privateKey } = await generatePublicAndPrivateKeyPair();

    Promise.all([writeFile(join(path, 'publicKey.pem'), publicKey), writeFile(join(path, 'privateKey.pem'), privateKey)]);
};

export default createKeyPair;
