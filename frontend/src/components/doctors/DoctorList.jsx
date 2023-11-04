import React, { useState, useEffect } from 'react'
import DoctorCards from './DoctorCards'
import BASE_URL from '../../config/ApiConfig';
import axios from "axios";


const DoctorList = () => {

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
  return (
    <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {doctors.map((doctor,index) => <DoctorCards key={index} doctor={doctor}/>)}
    </div>
  )
}

export default DoctorList