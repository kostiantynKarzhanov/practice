import chalk from "chalk";

const resLoggerMiddleware = (req, res, next) => {
    const statusCode = chalk.green(res.statusCode);

    res.on('finish', () => {
        console.log('\n' + '----- Response ----- ');
        console.log(`${statusCode}\t${res.getHeader('set-cookie')?.[0] ?? 'session cookie has been already set'}`);
    });

    next();
}

export default resLoggerMiddleware;