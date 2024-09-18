const multer = require('multer');
const Policy = require('../models/Policy');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const logger = require('../middlewares/logger');
const { handleError } = require('../middlewares/errorHandler');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configurazione di AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Funzione per l'upload del PDF su S3
async function uploadPdfToS3(file) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `policies/${file.originalname}`, // Nome file su S3
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const data = await s3.send(command); // Esegui l'upload
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/policies/${file.originalname}`;
  } catch (error) {
    throw new Error('Errore durante il caricamento del file su S3: ' + error.message);
  }
}

// Creazione di una nuova polizza con upload PDF
exports.createPolicy = async (req, res) => {
  try {
    const { policyNumber, type, contributor, paymentMethod, splitType, startDate, endDate, premiumAmount, invoiceAmount, status, policyNotes } = req.body;
    
    // Verifica se il file PDF è presente
    if (!req.file) {
      return res.status(400).json({
        errors: [{
          msg: 'Il file PDF della polizza è obbligatorio.',
          path: 'pdfUrl',
          location: 'body'
        }]
      });
    }

    // Esegui l'upload su S3
    const pdfUrl = await uploadPdfToS3(req.file);

    const newPolicy = new Policy({
      policyNumber,
      type,
      contributor,
      paymentMethod,
      splitType,
      startDate,
      endDate,
      premiumAmount,
      invoiceAmount,
      status,
      policyNotes,
      pdfUrl // URL del file caricato su S3
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);

  } catch (error) {
    console.error(error);
    res.status(500).send('Errore del server');
  }
};

// Funzione per ottenere una singola polizza
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

// Funzione per ottenere tutte le polizze
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate('client');
    if (!policies) {
      return res.status(404).json({ error: 'Nessuna polizza trovata.' });
    }
    res.json(policies);
  } catch (error) {
    handleError(res, error, 'Errore durante il recupero delle polizze.');
  }
};

// Aggiornamento di una polizza
exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: 'Polizza non trovata.' });
    }

    // Se un file è presente, carica il nuovo PDF su S3
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
