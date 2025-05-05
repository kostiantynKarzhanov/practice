// ----- import built-in modules -----
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

const sessionConfig = {
    name: process.env.SESSION_COOKIE_NAME,
    store: MongoStore.create({ client: mongoose.connection.client }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage
    // Note if you are using Session in conjunction with PassportJS, Passport will add an empty Passport object to the session for use after a user is authenticated, which will be treated as a modification to the session, causing it to be saved. 
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 // 1 min
    }
};

export default sessionConfig;