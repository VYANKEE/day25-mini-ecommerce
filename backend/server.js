require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Models (Make sure files exist in /models folder)
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

// ================= PRODUCT ROUTES =================

// 1. Add Product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const newProduct = new Product({ name, price, description, category, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. DELETE ALL PRODUCTS (Reset Store ke liye)
app.delete('/api/products/clear', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= CART ROUTES (UPDATED LOGIC) =================

// 4. Add/Update Cart (Negative fix included here)
app.post('/api/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists
      const itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        // Product pehle se hai -> Quantity update karo
        cart.products[itemIndex].quantity += quantity;

        // 🔥 CRITICAL FIX: Agar quantity 0 ya kam ho, toh uda do
        if (cart.products[itemIndex].quantity <= 0) {
          cart.products.splice(itemIndex, 1);
        }
      } else {
        // Naya product -> Add karo (agar quantity positive hai)
        if (quantity > 0) {
          cart.products.push({ productId, quantity });
        }
      }
      cart = await cart.save();
      res.status(200).json(cart);
    } else {
      // New Cart create karo
      if (quantity > 0) {
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity }]
        });
        res.status(201).json(newCart);
      } else {
        res.status(400).json({ message: "Invalid quantity" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Get Cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    res.json(cart || { products: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= ORDER ROUTES =================

// 6. Place Order
app.post('/api/orders', async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = cart.products.map(item => {
      total += item.quantity * item.productId.price;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    const order = new Order({
      userId,
      items: orderItems,
      totalPrice: total
    });

    await order.save();

    // Order ban gaya, ab cart khaali karo
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));