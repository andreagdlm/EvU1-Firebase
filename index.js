const express = require('express');
const db = require('./firebase');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
