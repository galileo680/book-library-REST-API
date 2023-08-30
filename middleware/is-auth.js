const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers('Authorization');
  if (!token) {
    const error = new Error('Not authenticated.');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    err.statusCode = 401;
    throw err;
  }
  next();
};
