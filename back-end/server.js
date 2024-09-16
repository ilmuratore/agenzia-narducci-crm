// server.js
// richiesta del file .env per le variabili d'ambiente
require('dotenv').config();

// Importazione dei moduli 
const express = require('express');
const cors = require('./config/cors');
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
const invoiceRoutes = require('./routes/invoiceRoutes');

// Implementazione di HTTPS per la connessione sicura
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./cert/key.pem'),	
    cert: fs.readFileSync('./cert/cert.pem'),
    ca: fs.readFileSync('./cert/ca.pem')
};


// Rotte API
app.use('/auth', authRoutes); // login 
app.use('/clients', authenticateJWT, clientRoutes); 
app.use('/policies', authenticateJWT, policyRoutes);
app.use('/invoices', authenticateJWT, invoiceRoutes);
app.use('/events', authenticateJWT, eventRoutes);
app.use('/api/users', basicAuthMiddleware, userRoutes); // creazione utente solo per Admin richiede credenziali di autenticazione


// Middleware per la gestione dei corpi e dei dati JSON
app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(errorHandler);

// Avvio del server Https sulla porta 443
https.createServer(options, app).listen(443, () => {
    console.log('Server HTTPS in esecuzione sulla porta 443');
    logger.info('Server in esecuzione su https://localhost:443'); // da rimuovere riferimento al link https una volta effettuato il deploy per evitare problemi di incomprensione

});

// TEST ONLY: verifica funzionamento HTTPS
app.get('/', (req, res) => {
    res.send('Server in esecuzione e funzionante. Buon Lavoro :D !'); // da mantenere per verificare il funzionamento del server 
});


// Inizializzazione di Express
const app = express();

// Connessione a MongoDB
connectDB();