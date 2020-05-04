const express = require('express');

const router = express.Router();
const Brand = require('../models/brand');
const { auth } = require('../middleware/auth');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const brands = await Brand.find({});
      res.status(200).send(brands);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  // add admin check
  .post(auth, async (req, res) => {
    try {
      const brand = new Brand(req.body);
      const data = await brand.save();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
