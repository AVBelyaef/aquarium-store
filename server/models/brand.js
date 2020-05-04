const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
});

module.exports = model('Brand', brandSchema);
