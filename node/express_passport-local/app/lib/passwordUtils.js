import {randomBytes, pbkdf2Sync} from 'node:crypto';

const hashPassword = (password) => {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
};

const validatePassword = (password, storedSalt, storedHash) => {
    const hash = pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512').toString('hex');

    return storedHash === hash;
};

export {
    hashPassword,
    validatePassword
};