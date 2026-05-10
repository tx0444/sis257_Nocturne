const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'usr_nocturne',
  password: '123456',
  database: 'nocturne_db',
});

const newHash = '$2b$10$prI6VMHFHa67m42.CTlLs.LNBFnwfN7XxeW2YSJsXnQYVcUa3uK6i';

async function fixAll() {
  try {
    await client.connect();
    
    // 1. Crear roles básicos
    await client.query(`
      INSERT INTO roles (id, nombre, descripcion, permisos, activo) VALUES
        (1, 'Administrador', 'Administrador total del sistema', '["ver","crear","editar","eliminar"]', true),
        (2, 'Cliente', 'Cliente de acceso VIP', '["ver"]', true),
        (3, 'Vendedor', 'Vendedor del sistema', '["ver","crear","editar"]', true),
        (4, 'Almacenero', 'Gestión de inventario', '["ver","crear","editar"]', true)
      ON CONFLICT (id) DO UPDATE SET nombre = EXCLUDED.nombre, permisos = EXCLUDED.permisos
    `);
    console.log('✅ Roles creados');
    
    // 2. Crear admin
    const admin = await client.query(
      `INSERT INTO usuarios (nombre, email, password, rol_id, activo, google_provider, ultimo_login)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (email) DO UPDATE SET password = $3, rol_id = $4, activo = $5
       RETURNING id, email, nombre, rol_id`,
      ['Administrador Nocturne', 'admin@nocturne.com', newHash, 1, true, false]
    );
    console.log('✅ Admin creado:', admin.rows[0]);
    
    // 3. Verificar
    const users = await client.query('SELECT id, email, nombre FROM usuarios');
    console.log('👥 Total usuarios:', users.rows.length, users.rows);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

fixAll();