const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { ensureDatabase } = require('../../../src/server/db');
const { initUserModel } = require('../../../src/server/models/User');
const { signToken, setAuthCookie } = require('../../../src/server/auth/jwt');
const { applyCors } = require('../../../src/server/http/cors');

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  foto: z.string().optional(),
});

async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = schema.parse(req.body);
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
      telefone: data.telefone || null,
      cidade: data.cidade || null,
      estado: data.estado || null,
      foto: data.foto || null,
    });

    const token = signToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        telefone: user.telefone,
        cidade: user.cidade,
        estado: user.estado,
        foto: user.foto,
      },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = handler;
