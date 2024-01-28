import React from "react";

const BackendError = ({ errorMessage }) => {
  return (
    <div className="my-3 rounded-lg border border-red p-3 text-sm">
      <p className="text-red">{errorMessage}</p>
    </div>
  );
};

export default BackendError;
