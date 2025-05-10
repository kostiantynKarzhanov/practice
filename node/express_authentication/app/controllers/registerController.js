// ----- import services -----
import { registerUser } from '../services/userService.js';

const renderRegisterView = (req, res) => {
    return res.render('register', { h1: 'Register', action: 'register' });
};

const handleRegister = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await registerUser(username, password);

        // return res.status(201).json({ 
        //     status: 'Success', 
        //     message: `User with the name: "${name}" has been registered.`
        // });

        // To automatically log in the newly registered user call req.login(user, cb). 
        // When the login operation completes, user will be assigned to req.user.
        // Note: passport.authenticate() middleware invokes req.login() automatically. 
        // This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.
        return req.login(user, (err) => {
            if (err) return next(err);

            return res.redirect(303, '/protected');
        })
    } catch (err) {
        if (err.code === 11000) {
            console.error(err.message);

            return res.status(409).json({
                status: 'error',
                message: `User with the name "${err.keyValue.name}" already exists, try another name.`
            });
        } else {
            console.error(err.stack);
            
            return next(err);
        }
    }
};

export {
    renderRegisterView,
    handleRegister
};