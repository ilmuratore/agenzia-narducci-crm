// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); 
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// middleware importati
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(errorHandler);

// connessione a MongoDB
connectDB();



// rotte importate
const authRoutes = require('./routes/authRoutes'); // login 
const userRoutes = require('./routes/userRoutes'); // creazione utente solo per Admin
const clientRoutes = require('./routes/clientRoutes');
const policyRoutes = require('./routes/policyRoutes');
const eventRoutes = require('./routes/eventRoutes');




// rotte API
app.use('/api/auth', authRoutes); // login 
app.use('/api/clients', clientRoutes); 
app.use('/api/policies', policyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes); // creazione utente solo per Admin


// script di avvio del server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server in esecuzione su http://localhost:${PORT}`);
});
