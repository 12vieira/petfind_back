const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('ERRO: a variável de ambiente DATABASE_URL não está definida.');
  console.error('Defina-a assim (ex): $env:DATABASE_URL = "postgres://postgres:postgres@127.0.0.1:5433/petfind"');
  process.exit(1);
}

async function main() {
  const [,, email, password] = process.argv;
  if (!email || !password) {
    console.error('Uso: node create-user.js <email> <password>');
    process.exit(1);
  }

  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const hash = await bcrypt.hash(password, 10);
    const insert = `INSERT INTO users (name, email, "passwordHash", "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, email, name`;
    const values = [email.split('@')[0], email, hash];
    const res = await client.query(insert, values);
    console.log('Usuário criado:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Erro ao criar usuário:', err.message || err);
    process.exit(2);
  }
}

main();
