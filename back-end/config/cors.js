const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // Sostituisci con il dominio del client una volta online
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

module.exports = cors(corsOptions);
