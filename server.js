require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connesso a MongoDB');
}).catch(err => {
    console.error('Errore di connessione a MongoDB:', err);
});

// Rotte di esempio
app.get('/', (req, res) => {
    res.send('API CRM Assicurativa');
});

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server in ascolto su porta ${PORT}`);
});
