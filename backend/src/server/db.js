const { Sequelize } = require('sequelize');

let sequelize;
let initialized = false;

function getSequelize() {
  if (!sequelize) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
    });
  }
  return sequelize;
}

async function ensureDatabase() {
  const instance = getSequelize();
  if (!initialized) {
    await instance.authenticate();
    await instance.sync();
    initialized = true;
  }
  return instance;
}

module.exports = { getSequelize, ensureDatabase };
