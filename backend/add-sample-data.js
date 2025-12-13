const { Pool } = require('pg');
require('dotenv').config();

async function addSampleData() {
  console.log('🌱 Adding sample data to NeonDB...\n');

  const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // 1. Add sample stores
    console.log('📋 Adding sample stores...');
    const stores = [
      { name: 'Pizza Palace', email: 'pizza@example.com', password: 'password123', phone: 12345678, type: 'restaurant' },
      { name: 'Burger King', email: 'burger@example.com', password: 'password123', phone: 87654321, type: 'restaurant' },
      { name: 'Pharmacie Centrale', email: 'pharma@example.com', password: 'password123', phone: 11223344, type: 'pharmacy' }
    ];

    for (const store of stores) {
      const storeResult = await client.query(
        'INSERT INTO magasin (nom, email, mot_de_passe, tel, type) VALUES ($1, $2, $3, $4, $5) RETURNING id_magazin',
        [store.name, store.email, store.password, store.phone, store.type]
      );
      console.log(`✅ Added store: ${store.name} (ID: ${storeResult.rows[0].id_magazin})`);
    }

    // 2. Get store IDs for products
    const storeQuery = await client.query('SELECT id_magazin, nom, type FROM magasin ORDER BY id_magazin');
    const storeMap = {};
    storeQuery.rows.forEach(store => {
      storeMap[store.type] = store.id_magazin;
    });

    // 3. Add sample products
    console.log('\n📋 Adding sample products...');
    const products = [
      // Restaurant products
      { name: 'Pizza Margherita', description: 'Pizza classique avec tomates, mozzarella et basilic frais', price: 1850, storeType: 'restaurant' },
      { name: 'Burger Royal', description: 'Burger avec bœuf, fromage, salade et frites', price: 2200, storeType: 'restaurant' },
      { name: 'Pasta Carbonara', description: 'Pâtes fraîches à la carbonara avec bacon et parmesan', price: 1650, storeType: 'restaurant' },
      { name: 'Salade César', description: 'Salade fraîche avec poulet grillé, croûtons et sauce César', price: 1400, storeType: 'restaurant' },
      { name: 'Coca Cola 33cl', description: 'Boisson gazeuse rafraîchissante', price: 350, storeType: 'restaurant' },
      
      // Pharmacy products  
      { name: 'Paracétamol 500mg', description: 'Antalgique et antipyrétique - Boîte de 16 comprimés', price: 450, storeType: 'pharmacy' },
      { name: 'Vitamine C 1000mg', description: 'Complément alimentaire - Boîte de 30 comprimés effervescents', price: 850, storeType: 'pharmacy' },
      { name: 'Crème Hydratante', description: 'Crème hydratante pour peaux sèches - Tube 100ml', price: 1200, storeType: 'pharmacy' }
    ];

    for (const product of products) {
      const storeId = storeMap[product.storeType];
      if (storeId) {
        await client.query(
          'INSERT INTO produit (nom, description, prix, id_magazin) VALUES ($1, $2, $3, $4)',
          [product.name, product.description, product.price, storeId]
        );
        console.log(`✅ Added product: ${product.name} (${product.price / 100} DT)`);
      }
    }

    // 4. Show summary
    console.log('\n📊 Summary:');
    const storeCount = await client.query('SELECT COUNT(*) as count FROM magasin');
    const productCount = await client.query('SELECT COUNT(*) as count FROM produit');
    
    console.log(`🏪 Stores added: ${storeCount.rows[0].count}`);
    console.log(`📦 Products added: ${productCount.rows[0].count}`);
    
    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
    process.exit(1);
  }
}

// Run the script
addSampleData()
  .then(() => {
    console.log('\n🎉 Sample data added successfully!');
    console.log('🚀 You can now test the API endpoints:');
    console.log('   - GET http://localhost:5000/api/products');
    console.log('   - GET http://localhost:5000/api/products?category=restaurant');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });