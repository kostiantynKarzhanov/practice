// ----- import built-in modules -----
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import mongoose from 'mongoose';

// ----- import custom modules -----
import connectDatabase from './config/connectDatabase.js';

// ----- import routes -----
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';

// ----- import middleware -----
import generalErrorHandler from './middleware/generalErrorHandler.js';

// ----- configure the app ----- 
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const app = express();

// connect to the database
connectDatabase();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('x-powered-by', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----- define app routes -----
app.get('/', (req, res) => {
    res.render('index', { h1: 'Home' });
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use(generalErrorHandler);

mongoose.connection.once('connected', () => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});