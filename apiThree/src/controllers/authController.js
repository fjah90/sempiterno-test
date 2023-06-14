const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../services/userServices');

const { JWT_SECRET } = process.env;

const authController = {};

authController.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
       res.status(200).json({ message: 'Sucess', token });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

authController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
       res.status(200).json({ message: 'Sucess', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = authController;