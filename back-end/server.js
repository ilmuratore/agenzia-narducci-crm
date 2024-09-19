// server.js

// Richiesta del file .env per le variabili d'ambiente
require('dotenv').config();

// Importazione dei moduli 
const express = require('express');
const connectDB = require('./config/db'); 
const https = require('https');

// Middleware custom importati
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authenticateJWT = require('./middlewares/authMiddleware');
const basicAuthMiddleware = require('./middlewares/basicAuthMiddleware');
const cors = require('./config/cors');
const helmet = require('helmet');
const limiter = require('./config/limiter');
const csrfProtection = require('./middlewares/csrfProtection');
const bodyParserConfig = require('./middlewares/bodyparser');
const httpsOptions = require('./config/httpsOptions');
const { swaggerSetup, swaggerUiSetup } = require('./config/swagger');


// Rotte importate
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const clientRoutes = require('./routes/clientRoutes');
const policyRoutes = require('./routes/policyRoutes');
const eventRoutes = require('./routes/eventRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

// Inizializzazione di Express
const app = express();

// Connessione a MongoDB
connectDB();

// CORS Middleware
app.use(cors);

// Middleware di sicurezza e gestione del corpo
app.use(limiter);
app.use(bodyParserConfig);
app.use(helmet());
app.use(csrfProtection);
app.use(express.json()); // Nel caso serva per altri formati di JSON

// Middleware personalizzato per la gestione degli errori
app.use(errorHandler);

// Swagger Docs
app.use('/api-docs', swaggerSetup, swaggerUiSetup);

// Rotte API
app.use('/auth', authRoutes); // login 
app.use('/clients', authenticateJWT, clientRoutes); 
app.use('/policies', authenticateJWT, policyRoutes);
app.use('/invoices', authenticateJWT, invoiceRoutes);
app.use('/events', authenticateJWT, eventRoutes);
app.use('/api/users', basicAuthMiddleware, userRoutes); // Creazione utente solo per Admin

// Test per verificare il funzionamento HTTPS
app.get('/', (req, res) => {
    res.send('Server in esecuzione e funzionante. Buon Lavoro :D !');
});

// Avvio del server Https sulla porta 443
https.createServer(httpsOptions, app).listen(443, () => {
    console.log('Server HTTPS in esecuzione sulla porta 443');
    logger.info('Server in esecuzione su https://localhost:443');
});
