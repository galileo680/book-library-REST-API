const express = require('express');
const { body, ExpressValidator } = require('express-validator');

const User = require('../models/userModel');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /auth/signup => PUT
router.put('/signup', userController.signup);

// /auth/login => POST
router.post('/login', userController.login);

module.exports = router;
