const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: "Uncategorized"
  },
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', productSchema);
