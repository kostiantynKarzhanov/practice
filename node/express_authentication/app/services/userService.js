// ----- import models -----
import UserModel from '../models/UserModel.js';

// ----- import custom modules -----
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';
import { createJWT, createTokenCookie } from '../utils/tokenService.js';

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

const verifyUser = async (password, user) => {
    try {
        const isVerified = user && await validatePassword(password, user.hash, user.salt);

        return isVerified;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const loginUser = async (name, password) => {
    try {
        const user = await findUserByName(name);
        const isVerified = await verifyUser(password, user);

        if (!isVerified) return null;

        const jwt = createJWT(user);
        const cookie = createTokenCookie(jwt);

        return cookie;
    } catch (err) {
        console.error(err.stack);

        throw err;    
    }
};

export {
    registerUser,
    loginUser
};