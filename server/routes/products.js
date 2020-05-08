const express = require('express');

const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// get/:id
// post/store
// get/..?sortBy=createdAt&order=desc&limit=10

router
  .route('/')
  .get(async (req, res) => {
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    try {
      const products = await Product.find()
        .populate('brand')
        .sort([[sortBy, order]])
        .limit(limit);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  })
  .post(auth, admin, async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(200).send({ success: true, product });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  });

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await (await Product.findById(id)).populate('brand');
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

module.exports = router;
