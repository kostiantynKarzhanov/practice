// ----- import models -----
import UserModel from '../models/UserModel.js';

// ----- import custom modules -----
import { generateHashFromPassword, validatePassword, generateSID } from '../utils/accessControlUtils.js';

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

const loginUser = async (name, password) => {
    try {
        const isVerified = await verifyUser(name, password);

        if (!isVerified) return null;
    
        return generateSID();
    } catch (err) {
        console.error(err.stack);

        throw err;    
    }
};

export {
    registerUser,
    verifyUser,
    loginUser
};