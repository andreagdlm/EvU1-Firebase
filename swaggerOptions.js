const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'API para gestionar tareas\n\n'+
      'Janeth Andrea Guillén de la Mora\n\n'+
      'Cristian Eduardo Plantillas Aguirre\n\n'+
      'Aldo Reymundo Sahagún González\n\n'+
      'Karina Yamilet Macedo Calvillo\n\n' +
      'Links Github\n\n' + 
      'Firebase\n'+
      'https://github.com/andreagdlm/EvU1-Firebase.git\n\n' +
      'MongoDB\n' +
      'https://github.com/andreagdlm/EvU1-MongoDB' 
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'task_id_123',
            },
            title: {
              type: 'string',
              description: 'Título de la tarea',
              example: 'Nueva tarea',
            },
            description: {
              type: 'string',
              description: 'Descripción de la tarea',
              example: 'Descripción de la nueva tarea',
            },
            completed: {
              type: 'boolean',
              description: 'Indica si la tarea está completada',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación de la tarea',
              example: '2024-10-28T12:34:56Z',
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(swaggerOptions);
