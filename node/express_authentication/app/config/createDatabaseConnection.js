import mongoose from 'mongoose';

const createDatabaseConnection = async (dbString) => {
    try {
        await mongoose.connect(dbString);

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

export default createDatabaseConnection;
