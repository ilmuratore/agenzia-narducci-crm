// server.js
// richiesta del file .env per le variabili d'ambiente
require('dotenv').config();

// Importazione dei moduli 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); 

// Middleware importati
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authenticateJWT = require('./middlewares/authMiddleware');
const basicAuthMiddleware = require('./middlewares/basicAuthMiddleware');


// Rotte importate
const authRoutes = require('./routes/authRoutes'); // login 
const userRoutes = require('./routes/userRoutes'); // creazione utente solo per Admin
const clientRoutes = require('./routes/clientRoutes');
const policyRoutes = require('./routes/policyRoutes');
const eventRoutes = require('./routes/eventRoutes');


// Implementazione di HTTPS per la connessione sicura
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./cert/key.pem'),	
    cert: fs.readFileSync('./cert/cert.pem'),
    ca: fs.readFileSync('./cert/ca.pem')
};

// Inizializzazione di Express
const app = express();


// Middleware importati avvio
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(errorHandler);

// Connessione a MongoDB
connectDB();


// Rotte API
app.use('/api/auth', authRoutes); // login 
app.use('/api/clients', authenticateJWT, clientRoutes); 
app.use('/api/policies', authenticateJWT, policyRoutes);
app.use('/api/events', authenticateJWT, eventRoutes);
app.use('/api/users', basicAuthMiddleware, userRoutes); // creazione utente solo per Admin richiede credenziali di autenticazione

// Avvio del server Https sulla porta 443
https.createServer(options, app).listen(443, () => {
    console.log('Server HTTPS in esecuzione sulla porta 443');
    logger.info('Server in esecuzione su https://localhost:443');
});

// TEST ONLY: verifica funzionamento HTTPS
app.get('/', (req, res) => {
    res.send('Implementazione di HTTPS funzionante!');
});
