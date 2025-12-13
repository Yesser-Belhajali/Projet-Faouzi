const { Pool } = require('pg');
require('dotenv').config();

async function cleanAndSetupDatabase() {
  console.log('🧹 Cleaning and setting up database...\n');

  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // 1. Clear existing data
    console.log('🗑️ Clearing existing data...');
    await client.query('DELETE FROM ligne_commande');
    await client.query('DELETE FROM livraison'); 
    await client.query('DELETE FROM commande');
    await client.query('DELETE FROM avis');
    await client.query('DELETE FROM produit');
    await client.query('DELETE FROM magasin');
    await client.query('DELETE FROM adresse');
    await client.query('DELETE FROM client');
    await client.query('DELETE FROM livreur');
    console.log('✅ Database cleared');

    // 2. Reset sequences
    console.log('🔄 Resetting sequences...');
    await client.query('ALTER SEQUENCE client_id_client_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE magasin_id_magazin_seq RESTART WITH 1'); 
    await client.query('ALTER SEQUENCE produit_id_produit_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE livreur_id_liv_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE commande_id_cmd_seq RESTART WITH 1');
    console.log('✅ Sequences reset');

    // 3. Add consistent sample stores
    console.log('\n🏪 Adding sample stores...');
    const stores = [
      { name: 'Pizza Palace', email: 'pizza@delivery.com', password: 'pizza123', phone: 12345678, type: 'restaurant' },
      { name: 'Burger House', email: 'burger@delivery.com', password: 'burger123', phone: 87654321, type: 'restaurant' },
      { name: 'Pharmacie Centrale', email: 'pharma@delivery.com', password: 'pharma123', phone: 11223344, type: 'pharmacy' },
      { name: 'Fresh Market', email: 'market@delivery.com', password: 'market123', phone: 55667788, type: 'boutique' }
    ];

    const storeIds = {};
    for (const store of stores) {
      const result = await client.query(
        'INSERT INTO magasin (nom, email, mot_de_passe, tel, type) VALUES ($1, $2, $3, $4, $5) RETURNING id_magazin',
        [store.name, store.email, store.password, store.phone, store.type]
      );
      storeIds[store.type] = result.rows[0].id_magazin;
      console.log(`✅ ${store.name} (${store.type})`);
    }

    // 4. Add consistent products (prices in cents)
    console.log('\n📦 Adding products...');
    const products = [
      // Restaurant products (Pizza Palace & Burger House)
      { name: 'Pizza Margherita', description: 'Pizza classique avec tomates, mozzarella et basilic frais', price: 1850, store: storeIds.restaurant },
      { name: 'Pizza Pepperoni', description: 'Pizza pepperoni avec fromage mozzarella', price: 2100, store: storeIds.restaurant },
      { name: 'Burger Royal', description: 'Burger avec bœuf, fromage, salade et frites', price: 2200, store: storeIds.restaurant },
      { name: 'Pasta Carbonara', description: 'Pâtes fraîches à la carbonara avec bacon et parmesan', price: 1650, store: storeIds.restaurant },
      { name: 'Salade César', description: 'Salade fraîche avec poulet grillé, croûtons et sauce César', price: 1400, store: storeIds.restaurant },
      { name: 'Coca Cola 33cl', description: 'Boisson gazeuse rafraîchissante', price: 350, store: storeIds.restaurant },
      
      // Pharmacy products
      { name: 'Paracétamol 500mg', description: 'Antalgique et antipyrétique - Boîte de 16 comprimés', price: 450, store: storeIds.pharmacy },
      { name: 'Vitamine C 1000mg', description: 'Complément alimentaire - Boîte de 30 comprimés effervescents', price: 850, store: storeIds.pharmacy },
      { name: 'Crème Hydratante', description: 'Crème hydratante pour peaux sèches - Tube 100ml', price: 1200, store: storeIds.pharmacy },
      { name: 'Sirop pour la toux', description: 'Sirop contre la toux - Flacon 150ml', price: 750, store: storeIds.pharmacy },

      // Boutique products
      { name: 'Pomme', description: 'Pommes fraîches du verger - 1kg', price: 280, store: storeIds.boutique },
      { name: 'Lait demi-écrémé', description: 'Lait demi-écrémé frais - 1L', price: 120, store: storeIds.boutique },
      { name: 'Pain complet', description: 'Pain complet bio artisanal', price: 220, store: storeIds.boutique },
      { name: 'Œufs bio', description: 'Œufs bio de poules élevées au sol - Boîte de 6', price: 380, store: storeIds.boutique }
    ];

    for (const product of products) {
      await client.query(
        'INSERT INTO produit (nom, description, prix, id_magazin) VALUES ($1, $2, $3, $4)',
        [product.name, product.description, product.price, product.store]
      );
      console.log(`✅ ${product.name} - ${(product.price / 100).toFixed(2)} DT`);
    }

    // 5. Show final summary
    console.log('\n📊 Final Database Summary:');
    const storeCount = await client.query('SELECT COUNT(*) as count FROM magasin');
    const productCount = await client.query('SELECT COUNT(*) as count FROM produit');
    
    console.log(`🏪 Total Stores: ${storeCount.rows[0].count}`);
    console.log(`📦 Total Products: ${productCount.rows[0].count}`);
    
    // Show products by category
    const restaurantProducts = await client.query(`
      SELECT COUNT(*) as count FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      WHERE m.type = 'restaurant'
    `);
    const pharmacyProducts = await client.query(`
      SELECT COUNT(*) as count FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      WHERE m.type = 'pharmacy'
    `);
    const boutiqueProducts = await client.query(`
      SELECT COUNT(*) as count FROM produit p 
      JOIN magasin m ON p.id_magazin = m.id_magazin 
      WHERE m.type = 'boutique'
    `);
    
    console.log(`🍕 Restaurant Products: ${restaurantProducts.rows[0].count}`);
    console.log(`💊 Pharmacy Products: ${pharmacyProducts.rows[0].count}`);
    console.log(`🛒 Boutique Products: ${boutiqueProducts.rows[0].count}`);

    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

cleanAndSetupDatabase()
  .then(() => {
    console.log('\n🎉 Database cleaned and set up successfully!');
    console.log('🚀 All products now have consistent pricing (in cents)');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });