// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { handleLogout } from '../controllers/logoutController.js';

const logoutRouter = Router();

logoutRouter.post('/', handleLogout);

export default logoutRouter;