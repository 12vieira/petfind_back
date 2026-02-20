const { Client } = require('pg');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('ERRO: a variável de ambiente DATABASE_URL não está definida.');
  process.exit(1);
}

async function main() {
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query('SELECT id, name, email, "createdAt" FROM users ORDER BY id DESC LIMIT 100');
    if (!res.rows || res.rows.length === 0) {
      console.log('Nenhum usuário encontrado (tabela vazia ou tabela não existe).');
    } else {
      console.table(res.rows);
    }
    await client.end();
  } catch (err) {
    console.error('Erro ao consultar users:', err.message || err);
    process.exit(2);
  }
}

main();
