// ----- import built-in modules -----
import mongoose from 'mongoose';

// ----- import utils -----
import { stopServer } from '../utils/serverUtils.js';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_STR_MONGO);
        
        console.log('Database connected');
    } catch (err) {
        console.error(err.stack);
    }

    mongoose.connection.on('error', (err) => {
        console.error(`Database connection error: ${err.message}`);

        stopServer(err.message);
    })
};

export default connectDatabase;
