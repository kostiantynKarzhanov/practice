// ----- import controllers -----
import { verifyUser } from "./loginController.js";

const isAuthenticated = async (cookieValue) => {
    const credentialsBase64 = cookieValue.split(' ').at(-1);
    const credentials = Buffer.from(credentialsBase64, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');

    return await verifyUser(username, password);
};

export {
    isAuthenticated
};