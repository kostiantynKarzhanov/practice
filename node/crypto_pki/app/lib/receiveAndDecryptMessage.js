// import built-in modules
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { privateDecrypt } from 'node:crypto';

// import custom modules
import log from './log.js';

const receiveAndDecryptMessage = async (receivedBy, sentBy, path) => {
    try {
        const pathEncryptedMessage = join(path, `user${sentBy}`, 'messages', 'encrypted.txt');
        const pathDecryptedMessage = join(path, `user${receivedBy}`, 'messages', 'decrypted.txt');
        const pathPrivateKeyRecipient = join(path, `user${receivedBy}`, 'keys', 'privateKey.pem');
    
        const privateKeyRecipient = await readFile(pathPrivateKeyRecipient, 'utf8');
        const encryptedBuffer = await readFile(join(pathEncryptedMessage));

        log(`Receiver: user${receivedBy} "received" encrypted message from user${sentBy}`);

        const messageBuffer = privateDecrypt(privateKeyRecipient, encryptedBuffer);

        log(`Receiver: user${receivedBy} decrypted message with PRIVATE key`);

        await writeFile(pathDecryptedMessage, messageBuffer);

        log(`Receiver: user${receivedBy} saved decrypted message to the file`);
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default receiveAndDecryptMessage;