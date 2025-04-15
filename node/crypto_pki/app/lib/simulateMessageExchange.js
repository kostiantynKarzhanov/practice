// import custom modules
import sendEncryptedMessageFromTo from './sendEncryptedMessageFromTo.js';
import receiveAndDecryptMessage from './receiveAndDecryptMessage.js';

const simulateMessageExchange = async (senderID, recipientID, path) => {
    await sendEncryptedMessageFromTo(senderID, recipientID, path);
    await sendEncryptedMessageFromTo(recipientID, senderID, path);

    await receiveAndDecryptMessage(senderID, recipientID, path);
    await receiveAndDecryptMessage(recipientID, senderID, path);
};

export default simulateMessageExchange;