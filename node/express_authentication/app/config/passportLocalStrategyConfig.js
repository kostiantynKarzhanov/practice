// ----- import built-in modules -----
import LocalStrategy from 'passport-local';

// ----- import custom modules -----
import { verifyUser } from '../services/userService.js';

// By default, LocalStrategy expects to find credentials in POST request parameters named 'username' and 'password'. 
// If your site prefers to name these fields differently, 'options' are available to change the defaults. 
// (https://github.com/jaredhanson/passport-local/tree/master)
const loginFormFieldNames = {
    usernameField: 'username',
    passwordField: 'password'
};

const passportLocalStrategy = new LocalStrategy(loginFormFieldNames, verifyUser);

export default passportLocalStrategy;