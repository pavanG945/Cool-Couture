const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/search?q=searchterm
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json([]);
    }

    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search
    
    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ]
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
