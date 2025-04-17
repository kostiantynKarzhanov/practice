// import built-in modules
import { createHash } from 'node:crypto';

const generateDigest = (data) => {
    const hashObj = createHash('sha256');

    hashObj.update(data);

    return hashObj.digest('hex');
};

export default generateDigest;
