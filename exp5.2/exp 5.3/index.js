const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection failed:', err));

// ------------------ SAMPLE ROUTES ------------------

// Insert sample products
app.post('/insert-sample', async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "T-Shirt",
        price: 499,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 20 },
          { color: "Blue", size: "L", stock: 15 },
          { color: "Black", size: "S", stock: 10 }
        ]
      },
      {
        name: "Sneakers",
        price: 2999,
        category: "Footwear",
        variants: [
          { color: "White", size: "8", stock: 25 },
          { color: "Black", size: "9", stock: 12 }
        ]
      },
      {
        name: "Wrist Watch",
        price: 1999,
        category: "Accessories",
        variants: [
          { color: "Silver", size: "Standard", stock: 8 },
          { color: "Black", size: "Standard", stock: 5 }
        ]
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "✅ Sample products inserted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter products by category
app.get('/products/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Project specific variant details (color and stock)
app.get('/products/variants/details', async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, 'variants.color': 1, 'variants.stock': 1, _id: 0 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
