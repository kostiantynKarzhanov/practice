import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sid: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
});

const SessionModel = mongoose.model('Session', sessionSchema);

export default SessionModel;