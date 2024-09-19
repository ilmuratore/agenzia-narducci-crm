// config/httpsOptions.js
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
    ca: fs.readFileSync('./cert/ca.pem')
};

module.exports = httpsOptions;
