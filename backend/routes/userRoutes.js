const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleWare');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/myList', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.myList);
  } catch (error) {
    console.error('Fetch myList error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/myList', authMiddleware, async (req, res) => {
  try {
    const { id, title, poster_path, media_type, release_date } = req.body;

    if (!id || !title) {
      return res.status(400).json({ message: 'Missing movie/show data' });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyExists = user.myList.some((item) => item.id === id);

    if (alreadyExists) {
      return res.status(400).json({ message: 'Item already in My List' });
    }

    user.myList.push({
      id,
      title,
      poster_path,
      media_type,
      release_date,
    });

    await user.save();

    res.status(201).json({ message: 'Added to My List' });
  } catch (error) {
    console.error('Add to myList error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/myList/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.myList = user.myList.filter((item) => item.id !== req.params.id);

    await user.save();

    res.json({ message: 'Removed from My List' });
  } catch (error) {
    console.error('Remove from myList error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;