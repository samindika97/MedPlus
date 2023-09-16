const mongoose = require("mongoose");

const DiseasesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String],
    required: true,
  },
});

module.exports =
  mongoose.model.Diseases || mongoose.model("Disease", DiseasesSchema);
