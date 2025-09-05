// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  sizeOptions: [String], // e.g. ['S', 'M', 'L']
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  ingredients: [String], // e.g. ['Coffee', 'Milk']
  roastLevel: String, // e.g. 'Medium Roasted'
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
