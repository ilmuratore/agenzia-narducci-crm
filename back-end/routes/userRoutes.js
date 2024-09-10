// routes/userRoutes.js
const express = require('express');
const {createUser} = require('../controllers/userController');
const userValidationRules = require('../validators/userValidator');

const router = express.Router();

router.post('/', userValidationRules(), createUser);

module.exports = router;

