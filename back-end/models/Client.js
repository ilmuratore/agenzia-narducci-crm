// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    fiscalCode: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    clientNotes: {
        type: String,
    },
    policies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Client', ClientSchema);
