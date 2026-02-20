const express = require('express');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { ensureDatabase } = require('../../db');
const { initUserModel } = require('../../models/User');
const { signToken, setAuthCookie, clearAuthCookie } = require('../../auth/jwt');

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    const token = signToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
