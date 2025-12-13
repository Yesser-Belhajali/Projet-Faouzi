require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function testTypes() {
  try {
    console.log('=== TYPES DE MAGASINS ===');
    const magasinsResult = await pool.query('SELECT DISTINCT type FROM magasin ORDER BY type');
    console.log('Types disponibles:', magasinsResult.rows.map(r => r.type));
    
    console.log('\n=== PRODUITS PAR TYPE ===');
    const typesResult = await pool.query(`
      SELECT m.type, COUNT(*) as count 
      FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      GROUP BY m.type 
      ORDER BY m.type
    `);
    console.log('Répartition des produits:');
    typesResult.rows.forEach(row => {
      console.log(`- ${row.type}: ${row.count} produits`);
    });
    
    console.log('\n=== TEST FILTRE RESTAURANT ===');
    const restaurantResult = await pool.query(`
      SELECT p.nom, m.nom as restaurant, m.type 
      FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      WHERE LOWER(m.type) = LOWER($1)
      LIMIT 10
    `, ['restaurant']);
    
    console.log(`Produits avec filtre type='restaurant': ${restaurantResult.rows.length}`);
    restaurantResult.rows.forEach(row => {
      console.log(`- ${row.nom} (${row.restaurant}) - Type: ${row.type}`);
    });
    
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await pool.end();
  }
}

testTypes();