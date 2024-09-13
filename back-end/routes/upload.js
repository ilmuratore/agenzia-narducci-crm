// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../s3'); 
const Policy = require('../models/policy'); 

// Rotta per l'upload del file PDF
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const policyId = req.body.policyId;
    const fileUrl = req.file.location; // URL del file caricato su S3

    // Trova la polizza e aggiorna il campo con l'URL del file
    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).send('Policy non trovata');
    policy.pdfUrl = fileUrl;
    await policy.save();

    res.send(`File caricato e associato con la policy ${policyId}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
