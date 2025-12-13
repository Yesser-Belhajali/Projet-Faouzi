const { Pool } = require('pg');
require('dotenv').config();

async function testProductQuery() {
  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    
    console.log('🔍 Testing product query...');
    
    // Test basic query first
    const basicResult = await client.query(`
      SELECT 
        p.id_produit as id,
        p.nom as name,
        p.description,
        p.prix as price,
        m.nom as restaurant,
        m.type as category,
        m.id_magazin as store_id
      FROM produit p
      JOIN magasin m ON p.id_magazin = m.id_magazin
      LIMIT 5
    `);
    
    console.log('✅ Basic query works, found products:', basicResult.rows.length);
    console.log('Sample product:', basicResult.rows[0]);
    
    // Test with category filter
    const filteredResult = await client.query(`
      SELECT 
        p.id_produit as id,
        p.nom as name,
        p.description,
        p.prix as price,
        m.nom as restaurant,
        m.type as category,
        m.id_magazin as store_id
      FROM produit p
      JOIN magasin m ON p.id_magazin = m.id_magazin
      WHERE LOWER(m.type) = LOWER($1)
    `, ['restaurant']);
    
    console.log('✅ Filtered query works, found restaurant products:', filteredResult.rows.length);
    filteredResult.rows.forEach(product => {
      console.log(`  - ${product.name} (${product.category})`);
    });
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testProductQuery();