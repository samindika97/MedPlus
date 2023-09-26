import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import queryString from "query-string";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { CheckIcon, ExpandIcon, SearchIcon } from "../../icons/icon";

import FeaturesTitle from "../../components/FeaturesTitle";
import CustomSelect from "../../components/CustomSelect";

import BASE_URL from "../../config/ApiConfig";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);

  const symptomOptions = symptoms.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const symptomSearch = (selectedSymptoms) => {
    // setLoading(true);

    const serializedSymptomArray = queryString.stringify({
      symptomArray: selectedSymptoms,
    });

    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}symptoms/search?${serializedSymptomArray}`,
    };
    axios(axiosConfig)
      .then((response) => {
        setDiseases(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

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
    <div className="w-full">
      <FeaturesTitle title="symptom checker" />
      <div className="w-full rounded-xl bg-lightGrey p-3">
        <Formik
          initialValues={{
            symptoms: [],
          }}
          // validationSchema={Yup.object({
          // })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            symptomSearch(values.symptoms);
            setSubmitting(false);
            resetForm({});
          }}
        >
          <Form className="mt-3 flex w-full flex-col">
            <Field
              name="symptoms"
              options={symptomOptions}
              component={CustomSelect}
              placeholder="Select symptoms..."
              isMulti={true}
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
          </Form>
        </Formik>
      </div>
      <p className="my-3 font-semibold">Search Results...</p>
      <div className="flex flex-col gap-3">
        {diseases.map((disease) => (
          <div className="rounded-xl bg-mintGreen p-3" key={disease._id}>
            <p className="mb-2 text-lg font-semibold capitalize text-blue">
              {disease.name}
            </p>
            <p className="line-clamp-3 text-blue">{disease.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomChecker;
