// import built-in modules
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile, readFile } from 'node:fs/promises';
import jwt from 'jsonwebtoken';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathPublicKey = join(__dirname, 'keys', 'publicKey.pem');
const pathPrivateKey = join(__dirname, 'keys', 'privateKey.pem');
const pathJWT = join(__dirname, 'token', 'json-web-token.txt');

const main = async () => {
    const payloadObj = {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true,
        "iat": 1516239022
    };

    // await createKeyPair(pathPublicKey, pathPrivateKey);
    const privateKey = await readFile(pathPrivateKey);
    const token = jwt.sign(payloadObj, privateKey, { algorithm: 'RS256' });

    await writeFile(pathJWT, token);

    const publicKey = await readFile(pathPublicKey);
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.error(err);
        } else {
            console.log('token is valid');
            console.log(decoded);
        }
    });
};

main();


