// import custom modules
import sendEncryptedMessage from './sendEncryptedMessage.js';
import receiveAndDecryptMessage from './receiveAndDecryptMessage.js';
import log from './log.js';

const simulateMessageExchange = async (senderID, recipientID, path) => {
    try {
        log('-- start message exchange simulation');

        await sendEncryptedMessage(senderID, recipientID, path);
        await receiveAndDecryptMessage(recipientID, senderID, path);

        await sendEncryptedMessage(recipientID, senderID, path);
        await receiveAndDecryptMessage(senderID, recipientID, path);
    
        log('-- end message exchange simulation');
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
};

export default simulateMessageExchange;