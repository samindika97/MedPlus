import React from 'react';

const LabReportDisplay = ({ labReportData }) => {
  return (
    <div>
      <h2>Lab Report Contents:</h2>
      <pre>{JSON.stringify(labReportData, null, 2)}</pre>
    </div>
  );
};

export default LabReportDisplay;

