import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_STR_MONGO);
        
        console.log('Database connected');
    } catch (err) {
        console.error(err.stack);
        throw err;
    }

    mongoose.connection.on('error', () => {
        console.error('Something happened with the database connection');
        throw err;
    })
};

export default connectDatabase;
