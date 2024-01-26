const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  reportContent: {
    type: String,
    required: true,
  },
  
});

const LabReport = mongoose.model('LabReport', labReportSchema);

module.exports = LabReport;
