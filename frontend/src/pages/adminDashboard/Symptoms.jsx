import React, { useState, useEffect } from "react";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState([]);

  const fetchSymptoms = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}symptoms/`,
    };
    axios(axiosConfig)
      .then((response) => {
        setSymptoms(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  return (
    <div className="flex w-full">
      <div className="h-full w-1/4 rounded-xl border border-grey p-3">
        <p className="">add new symptom</p>
      </div>
      <div className="w-full">
        {symptoms &&
          symptoms.map((symptom) => (
            <div className="" key={symptom.name}>
              <p className="">{symptom.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Symptoms;
