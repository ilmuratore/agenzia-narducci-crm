const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

// Uso di Winston per loggare errori
app.use((err, req, res, next) => {
    logger.error(`Errore: ${err.message}`, { stack: err.stack, url: req.url });
    res.status(500).json({ message: 'Errore interno del server', error: err.message });
});

