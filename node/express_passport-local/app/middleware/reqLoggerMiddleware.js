import chalk from 'chalk';

const reqLoggerMiddleware = (req, res, next) => {
    const timeStr = chalk.red(new Date().toLocaleString());
    const url = chalk.magenta(req.url);
    const method = chalk.yellow(req.method);
    const sessionID = chalk.blue(req.headers['cookie']?.split('=')[1] ?? null);

    console.log('\n' + '----- Request ----- ');
    console.log(`${timeStr}\t${method}\t${url}\t${sessionID}`);

    next();
};

export default reqLoggerMiddleware;