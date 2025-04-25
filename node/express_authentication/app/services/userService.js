import UserModel from '../models/UserModel.js';

const createUser = async (name, hash, salt) => {
    return await UserModel.create({ name, hash, salt });
};

const findUserByName = async (name) => {
    return await UserModel.findOne({ name });
};

export {
    createUser,
    findUserByName
};