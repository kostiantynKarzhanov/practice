import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    salt: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('user', UserSchema);

export {
    UserSchema,
    UserModel
}