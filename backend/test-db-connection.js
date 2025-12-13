require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  console.log('🔄 Testing database connection...\n');
  console.log('Database Configuration:');
  console.log(`  Host: ${process.env.DB_HOST}`);
  console.log(`  Port: ${process.env.DB_PORT}`);
  console.log(`  Database: ${process.env.DB_NAME}`);
  console.log(`  User: ${process.env.DB_USER}`);
  console.log(`  SSL: ${process.env.DB_SSL}\n`);

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Successfully connected to NeonDB!\n');

    // Test query
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log('📊 Database Info:');
    console.log(`  Current Time: ${result.rows[0].current_time}`);
    console.log(`  PostgreSQL Version: ${result.rows[0].postgres_version}\n`);

    // Check tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📋 Existing Tables:');
    if (tablesResult.rows.length === 0) {
      console.log('  No tables found in the database');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }

    client.release();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.error('\nError details:', error);
    process.exit(1);
  }
}

testConnection();
