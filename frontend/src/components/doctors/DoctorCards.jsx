import React from "react";
import DoctorImg from "../../assets/Doctorr.jpg";

const DoctorCards = ({ doctor }) => {
  const { name, specialization } = doctor;
  return (
    <div className=" p-3 lg:p-5">
      <div >
        <img className=" rounded-xl" src={DoctorImg} alt="doctor image" />
      </div>

      <h2 className=" text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-teal font-[700] mt-3 lg:mt-5">{name}</h2>
      <div className=" mt-2 lg:mt-4 flex item-center justify-between">
        <span className=" bg-mintGreen text-black py-1 px-2 lg:py-2  lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 rounded">{specialization} </span>
      </div>
    </div>
  );
};

export default DoctorCards;
