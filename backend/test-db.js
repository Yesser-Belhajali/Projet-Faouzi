const { Pool } = require('pg');
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('🔌 Testing NeonDB connection...');
  console.log('Database URL:', process.env.NEON_DATABASE_URL ? 'Set' : 'Not Set');
  console.log('DB Host:', process.env.DB_HOST);
  console.log('DB Name:', process.env.DB_NAME);
  console.log('DB User:', process.env.DB_USER);

  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time, version()');
    console.log('🕐 Current time:', result.rows[0].current_time);
    console.log('📊 Database version:', result.rows[0].version.substring(0, 50) + '...');
    
    client.release();
    await pool.end();
    
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === '28P01') {
      console.log('💡 Tip: Check your username and password in .env file');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 Tip: Check your database host URL in .env file');
    } else if (error.code === '3D000') {
      console.log('💡 Tip: Database name does not exist');
    }
    
    return { success: false, error: error.message, code: error.code };
  }
}

// Run the test
testDatabaseConnection()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 Database test completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ Database test failed. Please check your .env credentials.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });