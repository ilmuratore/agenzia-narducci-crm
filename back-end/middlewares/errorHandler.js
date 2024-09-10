// middlewars/errorHandler.js

const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`Errore: ${err.message}, Stack: ${err.stack}`);
    res.status(500).json({message: 'Errore interno del server, error: err.message'});
};

module.exports = errorHandler;