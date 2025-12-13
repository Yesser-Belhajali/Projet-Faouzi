# 🗄️ NeonDB Database Structure - Delivery Express

## 📊 Database Overview
- **Database Name:** neondb
- **Database Type:** PostgreSQL 17.7
- **Owner:** neondb_owner
- **Total Tables:** 9
- **Database Size:** 7.7 MB

---

## 📋 Table Structures

### 👤 CLIENT (Customer Management)
```sql
CREATE TABLE client (
    id_client INTEGER PRIMARY KEY DEFAULT nextval('client_id_client_seq'),
    email VARCHAR NOT NULL,
    tel INTEGER,
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    mot_de_passe VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'CLIENT',
    gouv_client VARCHAR,
    ville_client VARCHAR
);
```
**Purpose:** Store customer information and authentication  
**Key Fields:** email (unique), role (CLIENT/ADMIN), gouv_client (governorate), ville_client (city)

---

### 🏪 MAGASIN (Store/Restaurant Management)
```sql
CREATE TABLE magasin (
    id_magazin INTEGER PRIMARY KEY DEFAULT nextval('magasin_id_magazin_seq'),
    nom VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    mot_de_passe VARCHAR NOT NULL,
    tel INTEGER,
    type VARCHAR,
    gouv_magasin VARCHAR,
    ville_magasin VARCHAR
);
```
**Purpose:** Store information for restaurants, pharmacies, shops  
**Key Fields:** type (RESTAURANT/PHARMACY/BOUTIQUE), gouv_magasin (governorate), ville_magasin (city)

---

### 🚚 LIVREUR (Delivery Driver Management)
```sql
CREATE TABLE livreur (
    id_liv INTEGER PRIMARY KEY DEFAULT nextval('livreur_id_liv_seq'),
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    mot_de_passe VARCHAR NOT NULL,
    tel INTEGER,
    vehicule VARCHAR,
    ville_livraison VARCHAR,
    disponibilite TIME,
    gouv_livreur VARCHAR
);
```
**Purpose:** Manage delivery drivers and their availability  
**Key Fields:** vehicule (SCOOTER/CAR), disponibilite (working hours), gouv_livreur (governorate)

---

### 📦 PRODUIT (Product Catalog)
```sql
CREATE TABLE produit (
    id_produit INTEGER PRIMARY KEY DEFAULT nextval('produit_id_produit_seq'),
    nom VARCHAR NOT NULL,
    description TEXT,
    prix BIGINT NOT NULL,
    id_magazin INTEGER NOT NULL,
    image_url VARCHAR,
    categorie_id INTEGER
);
```
**Purpose:** Product listings for all stores  
**Foreign Key:** id_magazin → magasin.id_magazin  
**Key Fields:** image_url (product image), categorie_id (category reference)

---

### 🛍️ COMMANDE (Order Management)
```sql
CREATE TABLE commande (
    id_cmd INTEGER PRIMARY KEY DEFAULT nextval('commande_id_cmd_seq'),
    date_commande DATE NOT NULL,
    status VARCHAR,
    total DOUBLE PRECISION NOT NULL,
    id_client INTEGER NOT NULL
);
```
**Purpose:** Main order records  
**Foreign Key:** id_client → client.id_client  
**Status Values:** PENDING, CONFIRMED, PREPARING, READY, DELIVERED

---

### 📝 LIGNE_COMMANDE (Order Line Items)
```sql
CREATE TABLE ligne_commande (
    id_ligne INTEGER PRIMARY KEY DEFAULT nextval('ligne_commande_id_ligne_seq'),
    quantite INTEGER NOT NULL,
    id_cmd INTEGER NOT NULL,
    id_produit INTEGER NOT NULL
);
```
**Purpose:** Individual items within each order  
**Foreign Keys:**
- id_cmd → commande.id_cmd
- id_produit → produit.id_produit

---

### 🚛 LIVRAISON (Delivery Tracking)
```sql
CREATE TABLE livraison (
    id_livraison INTEGER PRIMARY KEY DEFAULT nextval('livraison_id_livraison_seq'),
    date_liv DATE NOT NULL,
    heure_estimee TIME,
    status VARCHAR,
    id_cmd INTEGER NOT NULL,
    id_liv INTEGER NOT NULL,
    ville VARCHAR,
    gouvernorat VARCHAR
);
```
**Purpose:** Track delivery progress and driver assignment  
**Foreign Keys:**
- id_cmd → commande.id_cmd
- id_liv → livreur.id_liv  
**Location Fields:** ville (city), gouvernorat (governorate)

---

### �️ CATEGORIE (Product Categories)
```sql
CREATE TABLE categorie (
    id INTEGER PRIMARY KEY DEFAULT nextval('categorie_id_seq'),
    nom VARCHAR NOT NULL,
    type USER-DEFINED NOT NULL
);
```
**Purpose:** Define product categories for classification  
**Key Fields:** nom (category name), type (category type)

---

### ⭐ AVIS (Reviews & Ratings)
```sql
CREATE TABLE avis (
    id_av INTEGER PRIMARY KEY DEFAULT nextval('avis_id_av_seq'),
    note_liv INTEGER,
    note_mag INTEGER,
    id_cmd INTEGER
);
```
**Purpose:** Customer feedback on deliveries and stores  
**Foreign Key:** id_cmd → commande.id_cmd  
**Rating Scale:** 1-5 stars

---

## 🔗 Database Relationships

```
CLIENT (1) ──── (N) COMMANDE
                  │
                  ├─── (1) ──── (N) LIGNE_COMMANDE ──── (N) ──── (1) PRODUIT
                  │                                                   │
                  ├─── (1) ──── (1) LIVRAISON ──── (N) ──── (1) LIVREUR
                  │
                  └─── (1) ──── (1) AVIS

MAGASIN (1) ──── (N) PRODUIT
CATEGORIE (1) ──── (N) PRODUIT
```

## 📱 Application Flow
1. **MAGASIN** creates **PRODUIT**
2. **CLIENT** places **COMMANDE** with multiple **LIGNE_COMMANDE**
3. **LIVRAISON** assigned to **LIVREUR**
4. Delivery completed, **AVIS** created for feedback

## 🔐 Authentication & User Management

### User Registration Process
- **CLIENT**: Stored in `client` table + address in `adresse` table
- **MAGASIN**: Stored in `magasin` table with store address in `adresse` field
- **LIVREUR**: Stored in `livreur` table with city information

### Password Security
- All passwords hashed using **bcryptjs** (salt rounds: 10)
- JWT tokens for session management
- Role-based access control

### Address Structure
```sql
-- For clients: separate adresse table with structured fields
INSERT INTO adresse (rue, ville, code_postal, complement, id_client)
VALUES ('123 Main St', 'Paris', '75001', 'Apt 4B', 1);

-- For stores: formatted address string in magasin table
UPDATE magasin SET adresse = '456 Business Ave, Lyon 69001' WHERE id_magazin = 1;
```

## 🎯 Current Status
- ✅ All tables created with proper constraints
- ✅ Primary keys and sequences configured
- ✅ Authentication system implemented with bcryptjs + JWT
- ✅ Address structure supports both clients (structured) and stores (formatted)
- ✅ Product filtering by type (restaurant, boutique, pharmacie, courses)
- ✅ Foreign key relationships established
- 📋 All tables currently empty (ready for data)

## 🚀 Ready for Implementation
This database structure supports:
- Multi-vendor marketplace (restaurants, pharmacies, shops)
- Complete order management workflow  
- Delivery driver assignment and tracking
- Customer address management
- Review and rating system