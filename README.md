# 🚚 Delivery Express

A comprehensive full-stack delivery platform built with **Angular** and **Node.js/Express.js**, supporting restaurant food delivery, boutique shopping, pharmacy orders, and course deliveries.

![Angular](https://img.shields.io/badge/Angular-20.x-red?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🏗️ Project Structure](#️-project-structure)
- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📦 Installation](#-installation)
- [🔧 Development](#-development)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/Projet-Faouzi.git
cd Projet-Faouzi

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start both servers (from backend directory)
cd ../backend
npm run dev:full
```

**Frontend:** http://localhost:4200  
**Backend API:** http://localhost:5000

## 🏗️ Project Structure

```
Projet-Faouzi/
├── frontend/                 # Angular 20.x application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Shared components (header, footer)
│   │   │   ├── pages/        # Feature modules
│   │   │   │   ├── admin/    # Admin dashboard
│   │   │   │   ├── restaurant/ # Restaurant ordering
│   │   │   │   ├── boutique/ # Shopping platform
│   │   │   │   ├── pharmacie/ # Pharmacy orders
│   │   │   │   └── courses/  # Course delivery
│   │   │   └── services/     # Angular services
│   │   └── assets/          # Static assets
│   └── package.json
├── backend/                 # Node.js/Express.js API
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── models/            # Data models
│   ├── middleware/        # Custom middleware
│   ├── .env              # Environment variables
│   └── server.js         # Main server file
├── .gitignore
├── .gitattributes
└── README.md
```

## ✨ Features

### 🏪 **Multi-Category Platform**
- **🍕 Restaurant Delivery** - Food ordering and delivery tracking
- **🛍️ Boutique Shopping** - Fashion and retail products
- **💊 Pharmacy Orders** - Medication and health products
- **📚 Course Delivery** - Educational materials and books

### 👥 **User Management**
- **Client Registration & Login**
- **Delivery Person Dashboard**
- **Admin Control Panel**
- **Role-based Access Control**

### 📊 **Admin Dashboard**
- Real-time order tracking
- User management system
- Revenue analytics
- Delivery performance metrics
- Comprehensive reporting

### 🔧 **Technical Features**
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Live order status
- **RESTful API** - Clean, documented endpoints
- **Security** - CORS, Helmet.js, input validation
- **Error Handling** - Comprehensive error management

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** Angular 20.x
- **Language:** TypeScript 5.x
- **Styling:** CSS3, Angular Material
- **State Management:** Angular Services
- **Routing:** Angular Router
- **HTTP Client:** Angular HttpClient

### **Backend**
- **Runtime:** Node.js 18+
- **Framework:** Express.js 5.x
- **Language:** JavaScript (ES6+)
- **Security:** Helmet.js, CORS
- **Logging:** Morgan
- **Environment:** dotenv
- **Development:** Nodemon, Concurrently

### **Development Tools**
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Editor:** VS Code
- **API Testing:** Built-in endpoints

## 📦 Installation

### **Prerequisites**
- Node.js 18+ and npm
- Git
- Modern web browser

### **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment
npm start
```

### **Frontend Setup**
```bash
cd frontend
npm install
ng serve
```

## 🔧 Development

### **Start Development Servers**
```bash
# Backend only
cd backend
npm run dev

# Frontend only
cd frontend
ng serve

# Both servers simultaneously
cd backend
npm run dev:full
```

### **Available Scripts**

**Backend (`/backend`)**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run dev:full` - Start both backend and frontend

**Frontend (`/frontend`)**
- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting

## 🌐 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### **Users**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### **Orders**
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/summary` - Order statistics

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### **Admin**
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/reports` - Generate reports
- `GET /api/admin/analytics` - Analytics data

**API Documentation:** http://localhost:5000 (when server is running)

## 🚀 Deployment

### **Frontend (Angular)**
```bash
cd frontend
ng build --configuration production
# Deploy 'dist/' folder to your hosting service
```

### **Backend (Node.js)**
```bash
cd backend
# Set NODE_ENV=production in your environment
npm start
```

### **Environment Variables**
```bash
# Backend .env configuration
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
JWT_SECRET=your-secure-secret
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow Angular style guide
- Use TypeScript strict mode
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🛟 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/your-username/Projet-Faouzi/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-username/Projet-Faouzi/discussions)

---

**🚚 Delivery Express** - Connecting businesses with customers through seamless delivery experiences.

*Built with ❤️ using Angular and Node.js*