const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User').default;

// @route   POST api/users
// @desc    register a user
// @access  public
router.post('/', [
  check('name', 'Please add name.').not().isEmpty(),
  check('email', 'Please add a valid email.').isEmail(),
  check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exists.' });
      }
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      },
        (error, token) => {
          if(error) throw error;
          res.json({ token });
        }
      )

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;