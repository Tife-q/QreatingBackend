const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Business = require('../models/business');
const authenticateToken = require('../middleware/authenticateToken');

const config = require('config');
const JWT_SECRET = config.get('jwtPrivateKey')

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password  } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role:"Coach",
      status:"Pending",
      active: true,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user.' });
  }
});


router.post('/register-business', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, companyName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Business({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      companyName,
      active: true,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user.' });
  }
});
  
  
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await Business.findOne({ email })
    }
    
    if (!user) {
      return res.status(404).json({ error: 'Email or password is incorrect.' });  
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email or password is incorrect.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role || 'Business', email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login successful.', user, token,role: user.role || 'Business' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to login.' });
  }
});


router.get('/all-users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden. Admin access required.' });
    }

    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});


router.get('/get-one/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ error: 'Access forbidden.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});


router.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ error: 'Access forbidden.' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body.data);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user.' });
  }
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ error: 'Access forbidden.' });
    }

    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

module.exports = router;
