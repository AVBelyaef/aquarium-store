const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.cookies.w_auth;
  try {
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    return error;
  }
};

module.exports = { auth };
