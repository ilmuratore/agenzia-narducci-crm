const mongoose = require('mongoose');
const logger = require('../middlewares/logger');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Connessione a MongoDB riuscita');
    } catch (error) {
        logger.error(`Errore di connessione a MongoDB: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
