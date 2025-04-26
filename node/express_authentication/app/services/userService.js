// ----- import models -----
import UserModel from '../models/UserModel.js';

// ----- import custom modules -----
import { generateHashFromPassword } from '../utils/passwordUtils.js';

const registerUser = async (username, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
         
        return await UserModel.create({ name: username, hash, salt });
    } catch (err) {
        console.error(err.stack);
    }
};

const findUserByName = async (name) => {
    return await UserModel.findOne({ name });
};

export {
    registerUser,
    findUserByName
};