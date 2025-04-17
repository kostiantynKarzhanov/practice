// import built-in modules
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// import custom modules
import createKeyPair from './lib/createKeyPair.js';
import simulateMessageExchange from './lib/simulateMessageExchange.js';
import log from './lib/log.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathData = join(__dirname, 'data');

const senderID = 'A';
const recipientID = 'B';

const main = async () => {
    try {
        log('----- start -----');

        await Promise.all([
            createKeyPair(join(pathData, `user${senderID}`, 'keys')), 
            createKeyPair(join(pathData, `user${recipientID}`, 'keys'))
        ]);
        log(`key pairs for user-${senderID} and user-${recipientID} succesfully created`);

        await simulateMessageExchange(senderID, recipientID, pathData);

        log('----- end -----');
    } catch (err) {
        console.error(err.stack);
    }
};

main();


