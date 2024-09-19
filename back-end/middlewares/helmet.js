// middlewares/helmet.js
const helmet = require('helmet');

const helmetConfig = helmet.contentSecurityPolicy();

module.exports = helmetConfig;
