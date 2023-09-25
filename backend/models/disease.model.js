const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DiseasesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  symptoms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Symptom",
    },
  ],
});

module.exports =
  mongoose.model.Diseases || mongoose.model("Disease", DiseasesSchema);
