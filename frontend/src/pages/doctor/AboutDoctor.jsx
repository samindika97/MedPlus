import React from "react";

const AboutDoctor = ({ doctor }) => {
  return (
    <div>
      <div>
        <h3 className="flex items-center gap-2 text-[20px] font-semibold leading-[30px] text-black">
          About of
          <span className=" text-teal text-[20px] font-bold leading-9 capitalize">{doctor.name}</span>
        </h3>
        <p className="mt-3 text-sm text-blue text-justify">{doctor.about}</p>
      </div>
    </div>
  );
};

export default AboutDoctor;
