// ----- import models -----
import UserModel from '../models/UserModel.js';

// ----- import custom modules -----
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';

const registerUser = async (name, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
         
        return UserModel.create({ name, hash, salt });
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const verifyUser = async (name, password) => {
    try {
        const user = await UserModel.findOne({ name }).exec();
        const isVerified = user && await validatePassword(password, user.hash, user.salt);

        return isVerified;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export {
    registerUser,
    verifyUser,
};