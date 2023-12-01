import React from 'react';

const AnalysisButton = ({ onAnalysisTrigger }) => {
  return (
    <button onClick={onAnalysisTrigger}>
      Trigger Analysis
    </button>
  );
};

export default AnalysisButton;
