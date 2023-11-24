import React from "react";

const AnalysisButton = ({ onAnalysisTrigger }) => {
  return (
    <button onClick={onAnalysisTrigger}>
      Analyze Lab Report
    </button>
  );
};

export default AnalysisButton;
