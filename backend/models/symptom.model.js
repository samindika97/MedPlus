const mongoose = require("mongoose");

const SymptomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports =
  mongoose.model.Symptoms || mongoose.model("Symptom", SymptomsSchema);
