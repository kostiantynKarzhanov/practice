import chalk from 'chalk';

const logMiddleware = (req, res, next) => {
    const time = new Date(req.timestamp).toLocaleString();
    const path = chalk.magenta(req.url);
    const method = chalk.yellow(req.method);
    const statusCode = chalk.green(res.statusCode);
    const userAgent = chalk.gray(req.headers['user-agent']);

    console.log('-'.repeat(time.length));
    console.log(`${time}\t${method}\t${path}\t${statusCode}\t${userAgent}`);

    return next();
};

export default logMiddleware;

