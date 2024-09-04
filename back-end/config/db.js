const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connesso a MongoDB');
    } catch (error) {
        console.error('Errore di connessione a MongoDB:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
