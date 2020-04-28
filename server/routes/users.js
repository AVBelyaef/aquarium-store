const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({
      success: true,
      userdata: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
