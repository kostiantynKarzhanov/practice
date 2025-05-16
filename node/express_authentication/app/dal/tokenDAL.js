// ----- import models -----
import RefreshTokenModel from '../models/RefreshTokenModel.js';

const createRefreshToken = (userId, value, expireAt) => RefreshTokenModel.create({ userId, value, expireAt });
const findRefreshTokenByValue = (value) => RefreshTokenModel.findOne({ value }).exec();
const deleteRefreshToken = (value) => RefreshTokenModel.deleteOne({ value }).exec();

export {
    createRefreshToken,
    findRefreshTokenByValue,
    deleteRefreshToken
};