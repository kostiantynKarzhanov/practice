import UserModel from '../models/UserModel.js';
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';

const createUser = async (username, password) => {
    try {
        const { hash, salt } = await generateHashFromPassword(password);
        const user = await UserModel.create({ name: username, password: hash, salt });

        return {
            status: 'success',
            message: `${user.name} has been registered`,
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
            console.error(err.stack);
            throw err;
        }
    }
};

export {
    createUser
};

// UserModel.create({ name: username, password })
// .then(user => {
//     console.log(user);
//     res.redirect('/');

// }).catch(err => {
//     if (err.code === 11000) {
//         res.status(409).send('<p>User already exists</p>');
//     }

//     console.error(err.message);
// });