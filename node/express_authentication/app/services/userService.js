// ----- import dal -----
import { createUser, findUserById, findUserByName } from '../dal/userDAL.js';

// ----- import utils -----
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';

const getUserById = (id) => findUserById(id);
const getUserByName = (name) => findUserByName(name);

const registerUser = async (name, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
         
        return createUser(name, hash, salt);
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const verifyUser = async (password, user) => {
    try {
        const isVerified = user && await validatePassword(password, user.hash, user.salt);

        return isVerified;
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

export {
    getUserById,
    getUserByName,
    registerUser,
    verifyUser,
};