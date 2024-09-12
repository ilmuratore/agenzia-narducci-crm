// middlewares/logger.js

const winston = require('winston');

// Configura colori per la console
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

// Configura il logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: consoleFormat 
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});

module.exports = logger;
