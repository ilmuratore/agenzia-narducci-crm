// routes/userRoutes.js
const express = require('express');
const {createUser, getUsers, updateUser, deleteUser} = require('../controllers/userController');
const userValidationRules = require('../validators/userValidator');

const router = express.Router();

router.post('/', userValidationRules(), createUser);
router.get('/', getUsers);
router.put('/:id', userValidationRules(), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

