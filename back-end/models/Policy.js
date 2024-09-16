// models/Policy.js
const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: false
    },
    policyNumber: {
        type: Number,
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
    invoiceAmount:{
        type: Number,
        required: true 
    },
    status: {
        type: String,
        enum: ['attiva', 'scaduta', 'sospesa', 'disdetta_cliente', 'disdetta_direzione'],
        default: 'attiva'
    },
    contributor: {
        type : String,
        enum: ['valerio', "d'ambrosio", 'tiziana', 'prisco', 'luciano', 'agenzia'],
        default: 'agenzia',
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['bonifico', 'contanti', 'pos', 'finanziamento'],
        required : true,
    },
    splitType: {
        type: String,
        enum: ['semestrale', 'annuale'],
        required : true,
    },
    Invoice:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    },
    policyNotes:{
        type: String,
        default: ''
    },
    pdfUrl: {
        type: String,
        required: true, // pdf con i file di polizza obbligatorio
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Policy', PolicySchema);
