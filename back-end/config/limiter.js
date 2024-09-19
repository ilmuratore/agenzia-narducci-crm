// config/limiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minuti
    max: 100, // Limita ogni IP a 100 richieste per finestra
});

module.exports = limiter;
