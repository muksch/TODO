const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tag', tagSchema);
