const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { applyCors } = require('../http/cors');
const apiRoutes = require('./routes');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (applyCors(req, res)) return;
  next();
});

app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/api', apiRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Express API listening on http://localhost:${port}`);
});
