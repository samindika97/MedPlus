import React, { useState, useEffect } from "react";
import BASE_URL from "../../config/ApiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import DoctorImg from "../../assets/Doctorr.jpg";
import AboutDoctor from "./AboutDoctor";
import Ratings from "./Ratings";
import DoctorSidePannel from "../../components/DoctorSidePannel";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);

  const fetchDoctor = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}doctor/${id}`,
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

  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="mx-w-[1170px] mx-auto mt-10 px-5 ">
        <div className="grid gap-[50px] md:grid-cols-3 ">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className=" max-h-[200px] max-w-[200px]">
                <img
                  src={DoctorImg}
                  alt="docotor"
                  className="w-full rounded-lg"
                />
              </figure>

              <div>
                <span className=" rounded bg-mintGreen px-6 py-1 text-[12px] font-semibold leading-4 text-black lg:py-2 lg:text-[16px] lg:leading-7">
                  {doctor.specialization}
                </span>
                <h3 className="mt-3 text-[22px] font-[500] capitalize leading-9 text-black">
                  {doctor.name}
                </h3>

                {/*need to add the rating */}

                <p className="mt-3 text-[15px] text-justify font-light text-blue">
                  {doctor.bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-gray-150">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-teal"
                } mr-5 px-5 py-2 text-[16px] font-semibold leading-7 text-black`}
              >
                About
              </button>

              <button
                onClick={() => setTab("ratings")}
                className={`${
                  tab === "ratings" && "border-b border-solid border-teal"
                } mr-5 px-5 py-2 text-[16px] font-semibold leading-7 text-black`}
              >
                Ratings
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <AboutDoctor doctor={doctor} />}
              {tab === "ratings" && <Ratings />}
            </div>
          </div>
          <div>
            
            <DoctorSidePannel/>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
