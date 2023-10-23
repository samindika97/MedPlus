import React from "react";

const people = (props) => {
  const { personimage, name } = props;
  return (
    <div className="flex flex-col items-center">
      <img src={personimage} alt="person_image" className="mb-5 h-64 w-64" />
      <p className="font-semibold">{name}</p>
    </div>
  );
};

export default people;
