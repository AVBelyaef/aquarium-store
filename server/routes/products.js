const express = require('express');

const router = express.Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router
  .route('/')
  .post(auth, admin, async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(200).send({ success: true, product });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  });


module.exports = router;
