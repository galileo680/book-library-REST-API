const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const userController = {
  signup: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
      const hashedPw = await bcryptjs.hash(password, 12);

      const user = await User.create({
        username: username,
        email: email,
        password: hashedPw,
      });

      res.status(201).json({
        message: 'User created!',
      });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
    }
  },
  login: async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let loadedUser;
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
        },
        'secret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: user.id.toString() });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(err.statusCode).json({ error: err.message });
      }
    }
  },
};
