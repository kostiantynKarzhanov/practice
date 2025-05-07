// ----- import built-in modules -----
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// ----- import custom modules -----
import connectDatabase from './config/connectDatabase.js';
import { stopServer } from './utils/serverUtils.js';

// ----- import routers -----
import indexRouter from './routers/indexRouter.js';
import loginRouter from './routers/loginRouter.js';
import logoutRouter from './routers/logoutRouter.js';
import registerRouter from './routers/registerRouter.js';
import protectedRouter from './routers/protectedRouter.js';

// ----- import middleware -----
import generalErrorHandler from './middleware/generalErrorHandler.js';

// ----- configure the app ----- 
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const databaseConnectionTimeout = setTimeout(stopServer, 3000, 'Database connection timeout');
const app = express();

// connect to the database
connectDatabase();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('x-powered-by', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: process.env.SESSION_COOKIE_NAME,
    store: MongoStore.create({ client: mongoose.connection.client }),
    secret: process.env.SESSION_SECRET.split(','),
    // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage
    // Note if you are using Session in conjunction with PassportJS, Passport will add an empty Passport object to the session for use after a user is authenticated, which will be treated as a modification to the session, causing it to be saved. 
    saveUninitialized: false,
    // Force the session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown.
    // With this enabled, the session identifier cookie will expire in maxAge since the last response was sent instead of in maxAge since the session was last modified by the server.
    rolling: true,
    cookie: {
        // If secure is true, and you access your site over HTTP, the cookie will not be set 
        // secure: true,
        maxAge: Number(process.env.SESSION_MAX_AGE_MS)
    }
}));

app.use((req, res, next) => {
    console.log('current session id:', req.session.id);
    console.log('current session expires in (s):', req.session.cookie.maxAge / 1000);

    next();
});

// ----- define app routes -----
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/protected', protectedRouter);
app.use(generalErrorHandler);

mongoose.connection.once('connected', () => {
    clearTimeout(databaseConnectionTimeout);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});