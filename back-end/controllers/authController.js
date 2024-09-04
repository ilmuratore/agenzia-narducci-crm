// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrazione utente
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Utente già esistente' });
        }
        user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'Registrazione completata' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Login utente
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Credenziali non valide' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenziali non valide' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h', 
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// verifica token jwt 
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Accesso negato' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token non valido' });
    }
};
