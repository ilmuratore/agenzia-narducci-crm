// middlewares/bodyParser.js
const bodyParser = require('body-parser');

const bodyParserConfig = bodyParser.json({ limit: '10kb' });

module.exports = bodyParserConfig;
