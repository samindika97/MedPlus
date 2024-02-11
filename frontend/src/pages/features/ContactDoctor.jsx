import React, { useState, useEffect } from "react";
import FeaturesTitle from "../../components/FeaturesTitle";
import { SearchIcon } from "../../icons/icon";
import DoctorImg from "../../assets/Doctorr.jpg";
import BASE_URL from "../../config/ApiConfig";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ContactDoctor = () => {
  const [searchDoctor, setSearchDoctor] = useState("");
  const [doctors, setDoctor] = useState([]);

  const fetchDoctor = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}doctor/`,
    };
    axios(axiosConfig)
      .then((response) => {
        setDoctor(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  console.log("Doctor:", doctors);

  const filteredDoctor = doctors.filter((doctor) => {
    return doctor && doctor.name && doctor.name.includes(searchDoctor);
  });

  return (
    <section className="w-full">
      <FeaturesTitle title="Find a Doctor" />
      <div className="w-full rounded-xl bg-lightGrey p-3">
        <div className="flex flex-col gap-2">
          <input
            className="al rounded-lg border border-grey p-2 outline-none"
            onChange={(e) => setSearchDoctor(e.target.value)}
            value={searchDoctor}
          />
          <div className="flex">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-md border-none bg-teal py-2 text-white outline-none"
              type="submit"
            >
              <SearchIcon />
              <p className="font-semibold uppercase ">search</p>
            </button>
          </div>
        </div>
      </div>

      <div className=" mx-auto  mt-[20px] xl:w-[470px]">
        <h2 className="text-center text-[25px] font-[500]">
          Our Great Doctors
        </h2>
        <p className="text-center text-sm text-blue">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur,
          consequuntur.
        </p>
      </div>

      <div className=" mb-[20px] mt-[10px] grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-[30px] lg:grid-cols-4 lg:gap-[30px]">
        {doctors &&
          filteredDoctor.map((doctor) => (
            <div className=" rounded-xl bg-lightGrey p-3 lg:p-2 " key={doctor._id}>
              <div>
                <img
                  className=" rounded-xl"
                  src={DoctorImg}
                  alt="doctor"
                />
              </div>

              <h2 className=" mt-3 text-[18px] font-[500] capitalize leading-[30px] text-teal lg:mt-1 lg:text-[26px] lg:leading-9">
                {doctor.name}
              </h2>
              <div className=" item-center mt-2 flex justify-between lg:mt-4">
                <span className=" rounded bg-mintGreen px-2 py-1 text-[12px]  leading-4 text-black lg:px-6 lg:py-2 lg:text-[16px] lg:leading-7">
                  {doctor.specialization}
                </span>
              </div>
              <NavLink className="h-5" to={`/doctor/${doctor._id}`}>
                <div>
                  <button className="mt-3 w-full rounded-lg  bg-teal px-10 py-1">
                    <p className="font-[500] uppercase text-white">Contact</p>
                  </button>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ContactDoctor;
