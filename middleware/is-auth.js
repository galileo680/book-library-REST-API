const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
