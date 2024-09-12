const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // Sostituisci con il tuo dominio
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Consente l'invio di cookie
};

module.exports = cors(corsOptions);
