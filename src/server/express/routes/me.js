const express = require('express');
const { ensureDatabase } = require('../../db');
const { initUserModel } = require('../../models/User');
const { getTokenFromRequest, verifyToken } = require('../../auth/jwt');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
