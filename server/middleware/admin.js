// const User = require('../models/user');

const admin = async (req, res, next) => {
  if (req.user.role === 0) {
    return res.send('У Вас нет прав администратора!');
  }
  return next();
};

module.exports = admin;
