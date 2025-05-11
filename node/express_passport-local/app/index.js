// ----- import built-in modules -----
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

// ----- import custom modules -----
import configurePassport from './config/passportConfig.js';
import { dbConnection } from './config/databaseConfig.js';

// ---------- middleware imports ----------
import reqLoggerMiddleware from './middleware/reqLoggerMiddleware.js';
import resLoggerMiddleware from './middleware/resLoggerMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import sessionUserLogger from './middleware/sessionUserLogger.js';

// ---------- router imports----------
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import logoutRouter from './routes/logoutRouter.js';

// ---------- app configuration ----------
const currentFilePath = fileURLToPath(import.meta.url);
const port = process.env.PORT || 3000;
const client = dbConnection.getClient();
const sessionSecret = process.env.SESSION_SECRET;
const store = MongoStore.create({ client, collectionName: 'sessions' });
const app = express();

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(currentFilePath), 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(reqLoggerMiddleware);
app.use(resLoggerMiddleware);

configurePassport();

app.use(session({
    store,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 } // cookie expires after 5 min
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(sessionUserLogger);

app.get('/', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    
    return res.render('index', { h1: 'Home Page', isAuthenticated });
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));