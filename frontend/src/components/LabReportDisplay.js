import React from 'react';

const LabReportDisplay = ({ labReportData }) => {
  return (
    <div>
      <h3>Lab Report Contents:</h3>
      <pre>{JSON.stringify(labReportData, null, 2)}</pre>
    </div>
  );
};

export default LabReportDisplay;

