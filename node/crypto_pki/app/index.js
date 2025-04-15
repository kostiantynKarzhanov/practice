// import built-in modules
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';
import simulateMessageExchange from './lib/simulateMessageExchange.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathData = join(__dirname, 'data');

const senderID = 'A';
const recipientID = 'B';

const main = async () => {
    try {
        await Promise.all([
            createKeyPair(join(pathData, `user${senderID}`, 'keys')), 
            createKeyPair(join(pathData, `user${recipientID}`, 'keys'))
        ]);

        await simulateMessageExchange(senderID, recipientID, pathData);
    } catch (err) {
        console.error(err.message);
    }
};

main();


