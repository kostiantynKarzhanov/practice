// ----- import services -----
import { registerUser } from '../services/userService.js';

const renderRegisterPage = (req, res) => {
    res.render('register', { h1: 'Register', action: 'register' });
};

const handleRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { name } = await registerUser(username, password);
    
        res.status(201).json({ 
            status: 'Success', 
            message: `User with the name: "${name}" has been registered.`
        });
    } catch (err) {
        if (err.code === 11000) {
            console.error(err.message);

            res.status(409).json({
                status: 'Failure',
                message: `User with the name "${err.keyValue.name}" already exists, try another name.`
            });
        } else {
            console.error(err.stack);
            
            res.status(500).json({
                status: 'Error',
                message: 'Internal server error.'
            });
        }
    }
};

export {
    renderRegisterPage,
    handleRegister
};