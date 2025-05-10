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

const findUserByName = (name) => UserModel.findOne({ name }).exec();
const findUserById = (id) => UserModel.findById(id).exec();

const verifyUser = async (name, password, done) => {
    try {
        const user = await findUserByName(name);
        const isVerified = user && await validatePassword(password, user.hash, user.salt);

        if (isVerified) return done(null, user);

        return done(null, false, { message: 'Incorrect username or password.' });
    } catch (err) {
        return done(err);
    }
};

export {
    registerUser,
    findUserByName,
    findUserById,
    verifyUser,
};