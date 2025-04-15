// import built-in modules
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { publicEncrypt } from 'node:crypto';

const sendEncryptedMessageFromTo = async (idSender, idRecipient, path) => {
    const pathOriginalMessage = join(path, `user${idSender}`, 'messages', 'original.txt');
    const pathEncryptedMessage = join(path, `user${idSender}`, 'messages', 'encrypted.txt');
    const pathPublicKeyRecipient = join(path, `user${idRecipient}`, 'keys', 'publicKey.pem');

    await writeFile(pathOriginalMessage, `<user ${idSender}: some sensitive message>`, 'utf8');
    
    const publicKeyRecipient = await readFile(pathPublicKeyRecipient);
    const messageBuffer = await readFile(pathOriginalMessage);
    const encryptedBuffer = publicEncrypt(publicKeyRecipient, messageBuffer);
 
    await writeFile(pathEncryptedMessage, encryptedBuffer);
};

export default sendEncryptedMessageFromTo;










