const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

const LabReport = mongoose.model('LabReport', { content: String });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Validate lab report function (placeholder, customize based on your requirements)
const validateLabReport = (labReportText) => {
  
  return labReportText.includes('healthy');
};

app.post('/upload', upload.single('labReport'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    const labReportText = data.text;

    // preprocessing and validation
    if (!validateLabReport(labReportText)) {
      return res.status(400).json({ error: 'Invalid lab report content' });
    }

    // Save the processed lab report data to the database
    const labReport = new LabReport({ content: labReportText });
    await labReport.save();

    res.status(200).json({ message: 'Lab report uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
