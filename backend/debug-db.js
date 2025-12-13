const { Pool } = require('pg');
require('dotenv').config();

async function debugDatabase() {
  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    
    console.log('=== DEBUGGING DATABASE CONTENT ===\n');
    
    // Check magasin table types
    console.log('🏪 MAGASIN TABLE - All types:');
    const magasinResult = await client.query('SELECT DISTINCT type FROM magasin ORDER BY type');
    magasinResult.rows.forEach(row => {
      console.log(`  - "${row.type}" (length: ${row.type.length})`);
    });
    
    console.log('\n📦 PRODUIT TABLE - Sample with magasin info:');
    const productResult = await client.query(`
      SELECT 
        p.id,
        p.nom,
        p.prix_unitaire,
        p.categorie,
        m.nom as magasin_nom,
        m.type as magasin_type
      FROM produit p 
      LEFT JOIN magasin m ON p.magasin_id = m.id 
      ORDER BY p.id 
      LIMIT 10
    `);
    
    productResult.rows.forEach(row => {
      console.log(`  ID: ${row.id} | ${row.nom} | Catégorie: "${row.categorie}" | Magasin: "${row.magasin_nom}" (${row.magasin_type})`);
    });
    
    console.log('\n🔍 PRODUCTS BY CATEGORY FILTERING:');
    const restaurantResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM produit p 
      LEFT JOIN magasin m ON p.magasin_id = m.id 
      WHERE LOWER(p.categorie) = 'restaurant'
    `);
    console.log(`  - Products with categorie = 'restaurant': ${restaurantResult.rows[0].count}`);
    
    const typeRestaurantResult = await client.query(`
      SELECT COUNT(*) as count 
      FROM produit p 
      LEFT JOIN magasin m ON p.magasin_id = m.id 
      WHERE LOWER(m.type) = 'restaurant'
    `);
    console.log(`  - Products where magasin.type = 'restaurant': ${typeRestaurantResult.rows[0].count}`);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugDatabase();