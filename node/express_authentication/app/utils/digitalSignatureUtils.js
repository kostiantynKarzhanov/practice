// ----- import built-in modules -----
import { createSign, createVerify } from 'node:crypto';

const createDigitalSignature = (data) => {
    const signObj = createSign(process.env.JWT_ALG);

    signObj.write(data);
    signObj.end();

    return signObj.sign(process.env.PRIVATE_KEY, 'base64url');
};

const verifyDigitalSignature = (data, signature) => {
    const verifyObj = createVerify(process.env.JWT_ALG);

    verifyObj.write(data);
    verifyObj.end();

    return verifyObj.verify(process.env.PUBLIC_KEY, signature, 'base64url');
};

export {
    createDigitalSignature,
    verifyDigitalSignature
};