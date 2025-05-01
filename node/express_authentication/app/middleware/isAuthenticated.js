// ----- import services -----
import { findSession, verifySession, createSessionCookie, isSessionHalfExpired, resetSessionExpiryDate } from '../services/sessionService.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const { sid } = req.cookies;

        if (sid) {
            const session = await findSession(sid);
            const isVerified = verifySession(session);

            if (isVerified) {
                const currentSession = isSessionHalfExpired(session) ? await resetSessionExpiryDate(session) : session;
                const { name, value, options } = createSessionCookie(currentSession);

                req.user = { 
                    username: session.username 
                }

                res.cookie(name, value, options);

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