// ----- import built-in modules -----
import { Router } from 'express';

// ----- import controllers -----
import { renderRegisterPage, handleRegister } from '../controllers/registerController.js';

const registerRouter = Router();

registerRouter.route('/')
    .get(renderRegisterPage)
    .post(handleRegister);

export default registerRouter;

