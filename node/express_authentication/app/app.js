// ----- import built-in modules -----
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());

// ----- define app routes -----
app.get('/', indexRouter);
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