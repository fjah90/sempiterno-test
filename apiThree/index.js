const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
db.connect();

// Configurar middleware
app.use(express.json());

app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de usuarios
app.use('/api/v1/users', userRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});