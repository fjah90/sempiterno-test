const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { pool } = require('../config/db');

exports.protect = async (req, res, next) => {
    try {

        // console.log(req)

        const authHeader = req.headers.authorization;
        // console.log(authHeader)
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};