// import built-in modules
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { publicEncrypt } from 'node:crypto';

// import custom modules
import log from './log.js';

const sendEncryptedMessage = async (sendFrom, sendTo, path) => {
    try {
        const pathOriginalMessage = join(path, `user${sendFrom}`, 'messages', 'original.txt');
        const pathEncryptedMessage = join(path, `user${sendFrom}`, 'messages', 'encrypted.txt');
        const pathPublicKeyRecipient = join(path, `user${sendTo}`, 'keys', 'publicKey.pem');
        const message = `<user ${sendFrom}: some sensitive message>`;
    
        await writeFile(pathOriginalMessage, message, 'utf8');
        
        log(`Sender: user${sendFrom} saved original message to the file`);
        
        const publicKeyRecipient = await readFile(pathPublicKeyRecipient);
        const messageBuffer = await readFile(pathOriginalMessage);
        const encryptedBuffer = publicEncrypt(publicKeyRecipient, messageBuffer);

        log(`Sender: user${sendFrom} encrypted message with user${sendTo} public key`);
     
        await writeFile(pathEncryptedMessage, encryptedBuffer);

        log(`Sender: user${sendFrom} saved encrypted message to the file`);
        log(`Sender: user${sendFrom} "sent" message to user${sendTo}`);
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default sendEncryptedMessage;










