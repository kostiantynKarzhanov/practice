// ----- import services -----
import { verifyUser } from "../services/userService.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const { auth } = req.cookies;

        if (auth && auth.startsWith('Basic')) {
            const credentialsBase64 = auth.split(' ')[1];
            const credentials = Buffer.from(credentialsBase64, 'base64').toString('utf8');
            const [username, password] = credentials.split(':');
            const isVerified = await verifyUser(username, password);

            if (isVerified) {
                req.user = {
                    username
                };
                
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