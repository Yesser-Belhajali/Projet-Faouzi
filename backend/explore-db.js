const { Pool } = require('pg');
require('dotenv').config();

async function showDatabaseContent() {
  console.log('📊 Exploring NeonDB Database Content...\n');

  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // 1. Show database info
    console.log('=== DATABASE INFO ===');
    const dbInfo = await client.query('SELECT current_database(), current_user, inet_server_addr(), inet_server_port()');
    console.log('Database Name:', dbInfo.rows[0].current_database);
    console.log('Current User:', dbInfo.rows[0].current_user);
    console.log('Server Address:', dbInfo.rows[0].inet_server_addr);
    console.log('Server Port:', dbInfo.rows[0].inet_server_port);
    console.log('');

    // 2. List all tables
    console.log('=== TABLES IN DATABASE ===');
    const tablesQuery = `
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    const tables = await client.query(tablesQuery);
    
    if (tables.rows.length === 0) {
      console.log('📋 No user tables found. Database is empty.');
    } else {
      console.log(`Found ${tables.rows.length} table(s):`);
      tables.rows.forEach((table, index) => {
        console.log(`${index + 1}. ${table.table_name} (${table.table_type})`);
      });
    }
    console.log('');

    // 3. Show structure and content of each table
    for (const table of tables.rows) {
      const tableName = table.table_name;
      console.log(`=== TABLE: ${tableName.toUpperCase()} ===`);

      // Show table structure
      const columnsQuery = `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;
      `;
      const columns = await client.query(columnsQuery, [tableName]);
      
      console.log('📋 Structure:');
      columns.rows.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type}${col.is_nullable === 'NO' ? ' NOT NULL' : ''}${col.column_default ? ` DEFAULT ${col.column_default}` : ''}`);
      });

      // Show row count
      const countQuery = `SELECT COUNT(*) as count FROM "${tableName}"`;
      const count = await client.query(countQuery);
      console.log(`📊 Rows: ${count.rows[0].count}`);

      // Show sample data (first 5 rows)
      if (parseInt(count.rows[0].count) > 0) {
        const dataQuery = `SELECT * FROM "${tableName}" LIMIT 5`;
        const data = await client.query(dataQuery);
        console.log('📄 Sample Data:');
        data.rows.forEach((row, index) => {
          console.log(`  Row ${index + 1}:`, JSON.stringify(row, null, 2));
        });
      } else {
        console.log('📄 No data in this table');
      }
      console.log('');
    }

    // 4. Show database size
    console.log('=== DATABASE STATISTICS ===');
    const sizeQuery = `
      SELECT 
        pg_size_pretty(pg_database_size(current_database())) as database_size,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') as table_count
    `;
    const stats = await client.query(sizeQuery);
    console.log('💾 Database Size:', stats.rows[0].database_size);
    console.log('📊 Total Tables:', stats.rows[0].table_count);

    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Error exploring database:', error.message);
    process.exit(1);
  }
}

// Run the exploration
showDatabaseContent()
  .then(() => {
    console.log('\n✅ Database exploration completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });