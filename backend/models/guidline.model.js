const mongoose = require("mongoose");

const guidlineSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  max_value: {
    type: Number,
    required: true,
  },
  min_value: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  recommendations: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("guidlines", guidlineSchema);
