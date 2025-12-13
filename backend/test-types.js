require('dotenv').config();
const database = require('./config/database');

async function testTypes() {
  try {
    await database.initialize();
    const db = database.getPool();
    
    // Vérifier tous les types de magasins
    console.log('=== TYPES DE MAGASINS ===');
    const magasinsResult = await db.query('SELECT DISTINCT type FROM magasin ORDER BY type');
    console.log('Types disponibles:', magasinsResult.rows.map(r => r.type));
    
    // Vérifier les produits par type
    console.log('\n=== PRODUITS PAR TYPE ===');
    const typesResult = await db.query(`
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
    
    // Vérifier spécifiquement les produits "restaurant"
    console.log('\n=== PRODUITS RESTAURANT ===');
    const restaurantResult = await db.query(`
      SELECT p.nom, m.nom as restaurant, m.type 
      FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      WHERE LOWER(m.type) = LOWER('restaurant')
      LIMIT 10
    `);
    
    if (restaurantResult.rows.length > 0) {
      console.log('Produits restaurant trouvés:');
      restaurantResult.rows.forEach(row => {
        console.log(`- ${row.nom} (${row.restaurant}) - Type: ${row.type}`);
      });
    } else {
      console.log('❌ Aucun produit restaurant trouvé!');
    }
    
    await database.close();
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

testTypes();