const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'sis257_nocturnecoldstorage'
});

async function updateDb() {
  try {
    await client.connect();
    const res = await client.query('UPDATE productos SET unidades_por_caja = 6, precio_caja = precio_venta * 5.5 WHERE precio_caja IS NULL OR unidades_por_caja IS NULL');
    console.log(`Updated ${res.rowCount} products.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

updateDb();
