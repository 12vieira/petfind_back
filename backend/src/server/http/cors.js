const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5423',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5423',
];

function getAllowedOrigins() {
  const envList = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '';
  const parts = envList.split(',').map((v) => v.trim()).filter(Boolean);
  return parts.length > 0 ? parts : DEFAULT_ORIGINS;
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();
  const allowOrigin = origin && allowedOrigins.includes(origin)
    ? origin
    : allowedOrigins[0];

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  return false;
}

module.exports = { applyCors };
