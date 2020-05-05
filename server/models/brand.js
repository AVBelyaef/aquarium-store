const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
  description: {
    required: true,
    type: String,
    maxlength: 100000,
  },
  images: {
    type: Array,
    default: [],
  },
});

module.exports = model('Brand', brandSchema);
