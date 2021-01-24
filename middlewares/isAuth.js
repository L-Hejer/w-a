// Require Json Web Token
const jwt = require('jsonwebtoken');

// Require the User Schema
const User = require('../models/User');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];

    // Check for token
    if (!token)
      return res.status(401).send({ msg: 'No token, authorizaton denied' });

    // Verify token
    const decoded = await jwt.verify(token, process.env.secretOrKey);

    // Add user from payload
    const user = await User.findById(decoded.id).select('-password');

    // Check for user
    if (!user) {
      return res.status(401).json({ msg: 'authorizaton denied' });
    }
    // create the user
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = isAuth;
