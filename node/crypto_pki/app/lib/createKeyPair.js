// import built-in modules
import fs from 'node:fs/promises';

// import custom modules
import generatePublicAndPrivateKeyPair from './generatePublicAndPrivateKeyPair.js';

const createKeyPair = async (path) => {
    const keyPair = await generatePublicAndPrivateKeyPair();

    fs.writeFile(`${path}/publicKey.pem`, keyPair.publicKey, 'utf8');
    fs.writeFile(`${path}/privateKey.pem`, keyPair.privateKey, 'utf8');
};

export default createKeyPair;
