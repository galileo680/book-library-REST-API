const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const userController = {
  signup: async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const hashedPw = await bcrypt.hash(password, 12);

      const user = await User.create({
        username: username,
        email: email,
        password: hashedPw,
      });

      res.status(201).json({
        message: 'User created!',
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  },
  login: async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          userId: user.id.toString(),
        },
        'secret',
        { expiresIn: '1h' }
      );
      // res.status(200).json({ token: token, userId: user.id.toString() });
      res.status(200).json({ token: token });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

module.exports = userController;
