// ----- import models -----
import SessionModel from '../models/SessionModel.js';

const createSession = (sid, username) => {
    const maxAge = 1000 * 60 * 60; // 1 hour
    const expires = Date.now() + maxAge;

    return SessionModel.create({ sid, username, expires });

    // these code works the same as .create():
    // const session = new SessionModel({ sid, username, expires });
    // return session.save();
};

const findSession = (sid) => SessionModel.findOne({ sid }).exec();

const deleteSession = (sid) => SessionModel.deleteOne({ sid }).exec();

const verifySession = (session) => session && session.expires > Date.now();

export {
    createSession,
    findSession,
    deleteSession,
    verifySession,
};