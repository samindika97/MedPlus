const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  report_id: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = Report = mongoose.model("report", ReportSchema);
