// ----- import built-in modules -----
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ----- import custom modules -----
import createDatabaseConnection from './config/createDatabaseConnection.js';

// ----- import routes -----
import loginRouter from './routes/loginRoute.js';
import registerRouter from './routes/registerRoute.js';

// ----- import middleware -----
import generalErrorHandler from './middleware/generalErrorHandler.js';

// ----- configure the app ----- 
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const dbString = process.env.DB_STR_MONGO;
const app = express();

// connect to the database
createDatabaseConnection(dbString);

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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

