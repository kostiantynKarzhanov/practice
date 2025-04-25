import { createUser } from '../services/userService.js';
import { generateHashFromPassword } from '../utils/passwordUtils.js';

const register = async (username, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
        const user = await createUser(username, hash, salt);

        return {
            status: 'success',
            message: `user: "${user.name}" has been registered`,
            statusCode: 201
        };
    } catch (err) {
        if (err.code === 11000) {
            console.error(err.message);

            return {
                status: 'failure',
                message: `user with the name "${err.keyValue.name}" already exists, try another name`,
                statusCode: 409
            };
        } else {
            console.error(err.message);
        }
    }
};

export {
    register
};