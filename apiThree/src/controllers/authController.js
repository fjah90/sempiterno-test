const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../services/userServices');

const { JWT_SECRET } = process.env;

const authController = {};

authController.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario
        const user = new User({ name, email, password });
        await user.save();
        // Generar un token JWT y devolverlo al cliente
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

authController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su email y verificar su contraseña
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT y devolverlo al cliente
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = authController;