import LocalStrategy from 'passport-local';
import { UserModel } from './databaseConfig.js';
import { validatePassword } from '../lib/passwordUtils.js';

const customFieldNames = {
	usernameField: 'name',
	passwordField: 'pass'
}

const verify = (username, password, done) => {
	UserModel.findOne({ name: username })
		.then(user => {
			if (!user) return done(null, false);

			const isPasswordValid = validatePassword(password, user.salt, user.hash);

			return done(null, isPasswordValid && user);
		})
		.catch(done);
};

const localStrategy = new LocalStrategy(customFieldNames, verify);

export default localStrategy