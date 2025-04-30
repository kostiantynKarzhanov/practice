// ----- import services -----
import { verifyUser } from '../services/userService.js';
import { findSession, verifySession } from '../services/sessionService.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const { sid } = req.cookies;

        if (sid) {
            const session = await findSession(sid);
            const isVerified = verifySession(session);

            if (isVerified) {
                req.user = { 
                    username: session.username 
                }

                return next();
            }
        }

        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized request.'
        });
    } catch (err) {
        return next(err);
    }
};

export default isAuthenticated;