const { Schema, model } = require('mongoose');

const productSchema = Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      maxlength: 50,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    form: {
      required: true,
      type: String,
      maxlength: 20,
    },
    size: {
      required: true,
      type: Number,
      maxlength: 5,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 10,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    available: {
      required: true,
      type: Boolean,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = model('Product', productSchema);
