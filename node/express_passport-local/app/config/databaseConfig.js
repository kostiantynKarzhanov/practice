import mongoose from 'mongoose';

const dbConnection = mongoose.createConnection(process.env.DB_STRING_MONGO);

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    hash: String,
    salt: String,
    dateCreated: { type: Date, default: Date.now }
});
const UserModel = dbConnection.model('UserModel', UserSchema);

export {
    dbConnection,
    UserModel
}
