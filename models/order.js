const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentType: {
    type: String,
    enum: ['COD', 'ONLINE'],
    default: 'COD'
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); 