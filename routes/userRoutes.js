const express = require('express');
const { body } = require('express-validator');

const User = require('../models/userModel');
const userController = require('../controllers/userController');

const router = express.Router();

// /auth/signup => PUT
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject('E-mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return User.findOne({ where: { username: value } }).then((user) => {
          if (user) {
            return Promise.reject('Username already exists!');
          }
        });
      }),
    body('password').trim().isLength({ min: 5 }),
  ],
  userController.signup
);

// /auth/login => POST
router.post('/login', userController.login);

module.exports = router;
