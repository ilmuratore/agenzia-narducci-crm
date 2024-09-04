// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); 

const app = express();

// middleware importati
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// connessione a MongoDB
connectDB();

// rotte importate
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const policyRoutes = require('./routes/policyRoutes');
const eventRoutes = require('./routes/eventRoutes');




// rotte API
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/events', eventRoutes);


// script di avvio del server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server in ascolto su porta ${PORT}`);
});
