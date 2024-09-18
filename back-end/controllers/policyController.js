const Policy = require('../models/Policy');
const { S3Client } = require('@aws-sdk/client-s3');
const logger = require('../middlewares/logger');
const { handleError } = require('../middlewares/errorHandler');
const s3 = new S3Client();


// Configurazione di AWS S3 (assicurati di avere configurato le tue chiavi correttamente)
const BUCKET_NAME = process.env.AWS_S3_BUCKET;

const uploadPdfToS3 = async (file) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `policies/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // URL del PDF su S3
  } catch (error) {
    throw new Error('Errore durante l\'upload su S3: ' + error.message);
  }
};

// Creazione di una nuova polizza con upload PDF
exports.createPolicy = async (req, res) => {
  try {
    const { client, policyNumber, type, startDate, endDate, premiumAmount, ...rest } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Il file PDF è obbligatorio.' });
    }
    const pdfUrl = await uploadPdfToS3(req.file);

    const newPolicy = new Policy({
      client,
      policyNumber,
      type,
      startDate,
      endDate,
      premiumAmount,
      pdfUrl,
      ...rest,
    });

    const savedPolicy = await newPolicy.save();
    logger.info(`Polizza creata con successo: ${savedPolicy._id}`);
    res.status(201).json(savedPolicy);
  } catch (error) {
    handleError(res, error, 'Errore durante la creazione della polizza.');
  }
};

// Lettura di una singola polizza
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id).populate('client');
    if (!policy) {
      return res.status(404).json({ error: 'Polizza non trovata.' });
    }
    res.json(policy);
  } catch (error) {
    handleError(res, error, 'Errore durante il recupero della polizza.');
  }
};

//Lettura di tutte le polizze

exports.getAllPolicy = async (req, res) => {
  try {
    const policies = await Policy.find().populate('client');
    if(!policies){
      return res.status(404).json({error: 'Nessuna polizza trovata.'});
    }
    res.json(policies);
  } catch (error) {
    handleError(res, error, 'Errore durante il recupero delle polizze.');
  }
};


// Aggiornamento di una polizza esistente
exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: 'Polizza non trovata.' });
    }
    if (req.file) {
      const pdfUrl = await uploadPdfToS3(req.file);
      req.body.pdfUrl = pdfUrl;
    }

    Object.assign(policy, req.body);
    const updatedPolicy = await policy.save();

    logger.info(`Polizza aggiornata con successo: ${updatedPolicy._id}`);
    res.json(updatedPolicy);
  } catch (error) {
    handleError(res, error, 'Errore durante l\'aggiornamento della polizza.');
  }
};

// Eliminazione di una polizza
exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: 'Polizza non trovata.' });
    }
    await policy.remove();
    logger.info(`Polizza eliminata con successo: ${policy._id}`);
    res.json({ message: 'Polizza eliminata con successo.' });
  } catch (error) {
    handleError(res, error, 'Errore durante l\'eliminazione della polizza.');
  }
};
