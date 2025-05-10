// ----- import built-in modules -----
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

// ----- import custom modules -----
import connectDatabase from './config/connectDatabase.js';
import configurePassport from './config/configurePassport.js';
import { stopServer } from './utils/serverUtils.js';
import loggerSession from './middleware/loggerSession.js';

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

connectDatabase();
configurePassport();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('x-powered-by', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_SECRET.split(','),
    store: MongoStore.create({ client: mongoose.connection.client }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE_MS)
    }
}));

// ----- passport initialization -----
app.use(passport.initialize());

// authenticate each session using the built-in 'session' strategy
// app.use(passport.authenticate('session'));
app.use(passport.session());

app.use(loggerSession);
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