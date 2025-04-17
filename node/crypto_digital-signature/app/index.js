// import built-in modules
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';
import createDigitalSignature from './lib/createDigitalSignature.js';
import verifyDigitalSignature from './lib/verifyDigitalSignature.js';
import log from './lib/log.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathFile = join(__dirname, 'data', 'file.txt');
const pathPrivateKey = join(__dirname, 'data', 'keys', 'privateKey.pem');
const pathPublicKey = join(__dirname, 'data', 'keys', 'publicKey.pem');

const main = async () => {
    try {
        log('----- start -----');
        await createKeyPair(join(__dirname, 'data', 'keys'));
        
        const bufferSignature = await createDigitalSignature(pathFile, pathPrivateKey);
        const isVerified = await verifyDigitalSignature(pathFile, pathPublicKey, bufferSignature);

        log('Result: ' + (isVerified ? 'Digital signature is valid' : 'Something wrong with the signature'));
        log('----- end -----');
    } catch (err) {
        console.error(err.stack);
    }
};

main();