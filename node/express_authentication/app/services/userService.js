// ----- import models -----
import UserModel from '../models/UserModel.js';

// ----- import custom modules -----
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';

const registerUser = async (name, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
         
        return await UserModel.create({ name, hash, salt });
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const verifyUser = async (name, password) => {
    try {
        const user = await UserModel.findOne({ name });
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

        const credentialsBase64 = Buffer.from(name + ':' + password, 'utf8').toString('base64');
    
        return `Basic ${credentialsBase64}`;
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