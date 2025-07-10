const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 