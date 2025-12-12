/**
 * Seed script to add sample products to MongoDB
 * Run with: node seedData.js
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Sample electronics products
const sampleProducts = [
  {
    productTitle: "Action Sports Camera 4K",
    productImg: [
      "https://sc02.alicdn.com/kf/HTB1abc123.jpg",
      "https://sc02.alicdn.com/kf/HTB1def456.jpg"
    ],
    price: 89.99,
    description: "High-quality 4K action sports camera with waterproof case",
    category: "electronics",
    subcategory: "action&sports-camera",
    stock: 50
  },
  {
    productTitle: "Sports Camera Accessory Kit",
    productImg: [
      "https://sc02.alicdn.com/kf/HTB1ghi789.jpg"
    ],
    price: 24.99,
    description: "Complete accessory kit for action cameras",
    category: "electronics",
    subcategory: "action&sports-camera-accessory",
    stock: 100
  },
  {
    productTitle: "Baby & Pet Monitor Camera",
    productImg: [
      "https://sc02.alicdn.com/kf/HTB1jkl012.jpg"
    ],
    price: 129.99,
    description: "Smart baby and pet monitoring camera with night vision",
    category: "electronics",
    subcategory: "baby&pet-monitor",
    stock: 30
  },
  {
    productTitle: "Photo Background Studio Set",
    productImg: [
      "https://sc02.alicdn.com/kf/HTB1mno345.jpg"
    ],
    price: 45.99,
    description: "Professional photo background set for studio photography",
    category: "electronics",
    subcategory: "backgrounds",
    stock: 75
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing data)
    // await Product.deleteMany({ category: 'electronics' });
    // console.log('🗑️  Cleared existing electronics products');

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${inserted.length} products`);

    // Display inserted products
    console.log('\n📦 Inserted Products:');
    inserted.forEach((product, index) => {
      console.log(`${index + 1}. ${product.productTitle} - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

