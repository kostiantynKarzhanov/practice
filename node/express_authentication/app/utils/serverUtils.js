const stopServer = (message) => {
    console.error(`${message}. Stopping the server.`);
    process.exit();
};

export {
    stopServer
}