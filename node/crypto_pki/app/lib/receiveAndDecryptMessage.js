// import built-in modules
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { privateDecrypt } from 'node:crypto';

const receiveAndDecryptMessage = async (idSender, idRecipient, path) => {
    const pathEncryptedMessage = join(path, `user${idSender}`, 'messages', 'encrypted.txt');
    const pathDecryptedMessage = join(path, `user${idRecipient}`, 'messages', 'decrypted.txt');
    const pathPrivateKeyRecipient = join(path, `user${idRecipient}`, 'keys', 'privateKey.pem');

    const privateKeyRecipient = await readFile(pathPrivateKeyRecipient, 'utf8');
    const encryptedBuffer = await readFile(join(pathEncryptedMessage));
    const messageBuffer = privateDecrypt(privateKeyRecipient, encryptedBuffer);

    await writeFile(pathDecryptedMessage, messageBuffer);
};

export default receiveAndDecryptMessage;