const log = (message) => {
    const timestamp = Date.now();

    console.log(`${timestamp}: ${message}`);
};

export default log;