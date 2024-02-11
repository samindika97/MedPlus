import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetDiseaseMutation } from "../../services/diseaseService";

import FeaturesTitle from "../../components/FeaturesTitle";

const HealthConditionDetails = () => {
  const params = useParams();

  const id = params.id;

  const [getDisease, { data, isSuccess }] = useGetDiseaseMutation();

  useEffect(() => {
    getDisease({ id });
  }, []);

  return (
    <div className="w-full">
      <FeaturesTitle title={isSuccess ? data.data.name : "loading ..."} />
      {isSuccess && <p className="">{data.data.content}</p>}
    </div>
  );
};

export default HealthConditionDetails;
