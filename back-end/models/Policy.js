// models/Policy.js
const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    policyNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['rc_auto', 'danni', 'vita', 'tcm', 'altro'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    premiumAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['attiva', 'scaduta', 'sospesa', 'disdetta_cliente', 'disdetta_direzione'],
        default: 'active'
    },
    Invoice:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Policy', PolicySchema);
