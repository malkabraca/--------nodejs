const morgan = require('morgan');
const chalk = require('chalk');

const logger = morgan((tokens, req, res) => {
    let logArray = [
        tokens.date(req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms"
    ];
    if (res.statusCode >= 400) {
        console.log(chalk.redBright(logArray.join(" ")));
    } else {
        console.log(chalk.cyanBright(logArray.join(" ")));
    }
});

module.exports=logger;