// models/Client.js
const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt
    },
    surname: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt
    },
    fiscalCode: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: encrypt,
        get: decrypt
    },
    phone: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt
    },
    address: {
        type: String,
        required: true,
        set: encrypt,
        get: decrypt
    },
    dateOfBirth: {
        type: Date,
        required: true,
        set: encrypt,
        get: decrypt
    },
    notes: {
        type: String,
        set: encrypt,
        get: decrypt
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// impostiamo i get e i set per crittografare i dati sensibili richiesti 
ClientSchema.set('toJSON', { getters: true });
ClientSchema.set('toObject', { getters: true });

module.exports = mongoose.model('Client', ClientSchema);
