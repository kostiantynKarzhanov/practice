import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// middleware
import timestampMiddleware from './app/middleware/timestampMiddleware.js';
import logMiddleware from './app/middleware/logMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;
const database = process.env.DB_MONGO_URI;

// set session store
const secret = process.env.SESSION_SECRET;
const sessionStore = MongoStore.create({
    mongoUrl: database,
    collectionName: 'sessions'
});

// set up middleware functions
app.use(timestampMiddleware);
app.use(logMiddleware);

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // cookie will expire after 1 day (ms * sec * min * hours)
    }
}));

app.get('/', (req, res) => {
    res.json({ title: 'Home Page', status: res.statusCode })
});

app.listen(port, () => {
    console.log('App is running on port: ' + port);
});
