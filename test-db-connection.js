const { Client } = require('pg');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('ERRO: a variável de ambiente DATABASE_URL não está definida.');
  console.error('Exemplo: postgres://postgres:postgres@127.0.0.1:5433/petfind');
  process.exit(1);
}

const client = new Client({ connectionString: url });

(async () => {
  try {
    await client.connect();
    const v = await client.query('SELECT version()');
    console.log('Conectado. Versão do Postgres:', v.rows[0].version);

    const tables = await client.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename LIMIT 50");
    console.log('Tabelas públicas (até 50):', tables.rows.map((r) => r.tablename));

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('Falha na conexão com o banco:');
    console.error(err.message || err);
    process.exit(2);
  }
})();
