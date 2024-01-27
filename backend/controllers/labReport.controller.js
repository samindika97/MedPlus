const LabReport = require('../models/labReportModel');

//  to handle lab report submission
const submitLabReport = async (req, res) => {
  try {
    // Extract necessary information from the request
    const { patientName, reportContent } = req.body;

    // Validate required fields
    if (!patientName || !reportContent) {
      return res.status(400).json({ error: 'Patient name and report content are required.' });
    }

    // Create a new lab report instance
    const newLabReport = new LabReport({
      patientName,
      reportContent,
      
    });

    // Save the lab report to the database
    await newLabReport.save();

    // Respond with success
    res.status(200).json({ message: 'Lab report submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  submitLabReport,
};
