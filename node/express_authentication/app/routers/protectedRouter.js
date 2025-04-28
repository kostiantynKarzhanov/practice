// ----- import built-in modules -----
import { Router } from 'express';

// ----- import middleware -----
import isAuthenticated from '../middleware/isAuthenticated.js';

// ----- import controllers -----
import { handleProtectedView } from '../controllers/protectedController.js';

const protectedRouter = Router();

protectedRouter.get('/', isAuthenticated, handleProtectedView);

export default protectedRouter;