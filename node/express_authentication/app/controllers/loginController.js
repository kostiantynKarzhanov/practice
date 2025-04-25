// ----- import custom modules -----
import { findUserByName } from '../services/userService.js';
import { validatePassword } from '../utils/passwordUtils.js';

const verifyUser = async (username, password) => {
    try {
        const user = await findUserByName(username);
        const isVerifiedUser = user && await validatePassword(password, user.hash, user.salt);

        return isVerifiedUser;
    } catch (err) {
        console.error(err.message);
    }
};

export {
    verifyUser
};

