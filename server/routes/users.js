const express = require('express');

const router = express.Router();
const User = require('../models/user');
// Middlewares
const { auth } = require('../middleware/auth');

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        loginSuccess: false,
        message: 'Электронная почта не найдена.',
      });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      res.status(400).json({
        loginSuccess: false,
        message: 'Неверный пароль!',
      });
    }
    const currentUser = await user.generateToken();
    res.cookie('w_auth', currentUser.token).status(200).json({
      loginSuccess: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findOneAndUpdate({ _id }, { token: '' });
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

module.exports = router;
