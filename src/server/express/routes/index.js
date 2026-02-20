const express = require('express');
const authRoutes = require('./auth');
const meRoutes = require('./me');
const petsRoutes = require('./pets');
const matchesRoutes = require('./matches');
const likesRoutes = require('./likes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/me', meRoutes);
router.use('/pets', petsRoutes);
router.use('/pets/:id/like', likesRoutes);
router.use('/matches', matchesRoutes);

module.exports = router;
