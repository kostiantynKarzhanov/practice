// import built-in modules
import { createHash } from 'node:crypto';

const generateHexDigest = (data) => createHash('sha256')
    .update(data)
    .digest('hex');

export default generateHexDigest;