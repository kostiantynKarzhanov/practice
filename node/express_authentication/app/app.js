import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ----- import middleware -----
import generalErrorHandler from './middleware/generalErrorHandler.js';

// ----- configure the app ----- 
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.set('x-powered-by', false);

// ----- define app routes -----
app.get('/', (req, res) => {
    res.render('index', { h1: 'Home' });
});

app.use(generalErrorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

