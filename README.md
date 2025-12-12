# Rareus Import Export Backend

Backend API for Rareus Import Export e-commerce platform built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- User Authentication (Register & Login)
- JWT-based authentication
- User management
- Product management
- Electronics category API
- MongoDB database integration
- Password hashing with bcrypt

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Abhinavraj53/rareusimportexportbackend.git
cd rareusimportexportbackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - User login

### Users
- `GET /users/:token` - Get user information by token

### Products
- `GET /electronics` - Get all electronics products
- `GET /electronics/:category` - Get products by category

## 🗄️ Database

The application uses MongoDB with the following collections:
- `users` - User accounts
- `products` - Product catalog

## 📦 Project Structure

```
backend/
├── models/
│   ├── User.js          # User model
│   └── Product.js       # Product model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── users.js         # User routes
│   └── electronics.js  # Electronics routes
├── .env                 # Environment variables (not in git)
├── .gitignore          # Git ignore file
├── server.js            # Main server file
├── seedData.js          # Database seeding script
└── package.json         # Dependencies
```

## 🔐 Environment Variables

Create a `.env` file with the following variables:

- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## 🌱 Seeding Database

To add sample products to the database:

```bash
node seedData.js
```

## 📝 API Request Examples

### Register User
```json
POST /register
{
  "email": "user@example.com",
  "password": "password123",
  "companyName": "Company Name",
  "firstName": "John",
  "lastName": "Doe",
  "telNo": "1234567890"
}
```

### Login
```json
POST /login
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📄 License

ISC

## 👤 Author

Rareus Import Export

## 🔗 Repository

https://github.com/Abhinavraj53/rareusimportexportbackend
