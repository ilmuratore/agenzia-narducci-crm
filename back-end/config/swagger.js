const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentazione API per il progetto'
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerSetup = swaggerUi.serve;
const swaggerUiSetup = swaggerUi.setup(swaggerSpec);

module.exports = { swaggerSetup, swaggerUiSetup };
