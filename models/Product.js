const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true
  },
  productImg: [{
    type: String
  }],
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

