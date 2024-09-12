// middlewares/basicAuthMiddleware.js
const auth = require('basic-auth');

const basicAuthMiddleware = (req, res, next) => {
    const credentials = auth(req);

    // Verifica le credenziali
    if (credentials && credentials.name === process.env.ADMIN_USERNAME && credentials.pass === process.env.ADMIN_PASSWORD) {
        return next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).json({ message: 'Autenticazione fallita' });
    }
};

module.exports = basicAuthMiddleware;
