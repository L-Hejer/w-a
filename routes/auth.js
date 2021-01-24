// Require router from express
const router = require('express').Router();

// Require bcryptjs
const bcrypt = require('bcryptjs');

// Require Json Web Token
const jwt = require('jsonwebtoken');

//
const isAuth = require('../middlewares/isAuth');

const {
  validator,
  registerRules,
  loginRules,
} = require('../middlewares/validator');

// Require the User Schema
const User = require('../models/User');

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    // Simple Validation
    /*   if (!name || !lastName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    } */
    // Check for existing users
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: 'User already exists!' });
    }
    // Create a new user
    user = new User({ name, lastName, email, password });

    // Create hash & salt
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    // Save the user
    await user.save();

    // Sign User
    const payload = {
      id: user.id,
    };

    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7 days',
    });

    res.status(200).send({ msg: 'User registred with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Simple Validation
    /* if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    } */
    // Check for existing users
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'User does not exist' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Bad Credentials' });
    }

    // Sign User
    const payload = {
      id: user.id,
    };

    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7 days',
    });

    res.send({ msg: 'logged in with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route GET api/auth/user
// @desc   Get Authentified User
// @access Private
router.get('/user', isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});

module.exports = router;
