// ----- import models -----
import SessionModel from '../models/SessionModel.js';

const generateSessionExpiryDate = () => new Date(Date.now() + Number(process.env.SESSION_MAX_AGE_MS));

const isSessionHalfExpired = ({ expires }) => {
    const remainingTimeMS = expires.getTime() - Date.now();

    return remainingTimeMS <= process.env.SESSION_MAX_AGE_MS / 2;
};

const resetSessionExpiryDate = (session) => {
    session.expires = generateSessionExpiryDate();

    return session.save(); 
};

const createSession = (sid, username) => {
    const expires = generateSessionExpiryDate();

    // --- similar to create():
    // const session = new SessionModel({ sid, username, expires });
    // return session.save();

    return SessionModel.create({ sid, username, expires });
};

const createSessionCookie = ({ sid, expires }) => {
    return {
        name: process.env.SESSION_COOKIE_NAME,
        value: sid,
        options: {
            httpOnly: true,
            secure: true,
            expires
        }
    };
};

const findSession = (sid) => SessionModel.findOne({ sid }).exec();

const deleteSession = (sid) => SessionModel.deleteOne({ sid }).exec();

const verifySession = (session) => session && session.expires.getTime() > Date.now();

export {
    createSession,
    createSessionCookie,
    findSession,
    deleteSession,
    verifySession,
    isSessionHalfExpired,
    resetSessionExpiryDate
};