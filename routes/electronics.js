const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get electronics products by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    // Decode URL-encoded category name
    const decodedCategory = decodeURIComponent(category);
    
    // Find products by category
    const products = await Product.find({ 
      category: 'electronics',
      $or: [
        { subcategory: decodedCategory },
        { productTitle: { $regex: decodedCategory, $options: 'i' } }
      ]
    });

    if (products.length === 0) {
      // Return empty array if no products found
      return res.json([]);
    }

    res.json(products);
  } catch (error) {
    console.error('Get electronics error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Get all electronics products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ category: 'electronics' });
    res.json(products);
  } catch (error) {
    console.error('Get all electronics error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;

