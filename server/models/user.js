const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function comparePas(
  candidatePassword,
) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    return error;
  }
};

userSchema.methods.generateToken = async function generate() {
  const user = this;
  try {
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    const tokenUser = await user.save();
    return tokenUser;
  } catch (error) {
    return error;
  }
};

userSchema.statics.findByToken = async function find(token) {
  const user = this;
  try {
    const decode = await jwt.verify(token, process.env.SECRET);
    const currentUser = await user.findOne({ _id: decode, token });
    return currentUser;
  } catch (err) {
    // err
    return { token: false, err };
  }
};

module.exports = mongoose.model('User', userSchema);
