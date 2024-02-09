import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { SearchIcon } from "../../icons/icon";
import FeaturesTitle from "../../components/FeaturesTitle";
import { useState, useEffect } from "react";
import CustomSelect from "../../components/CustomSelect";

import { TextInputWithLabel as TextInput } from "../../components/FormikElements";

import BASE_URL from "../../config/ApiConfig";



const LabReportAnalyzer = () => {
  const [reportTypes, setReportTypes] = useState([]);

  const reportOptions = reportTypes.map((item, index) => ({
    label: item,
    value: index,
  }));

  const fetchLabReportTypes = () => {
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}guidline/ReportTypes/`,
    };
    axios(axiosConfig)
      .then((response) => {
        //console.log(response.data);
        setReportTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  }

  useEffect(() => {
    fetchLabReportTypes();
  }, []);

  return (
    <div className="w-full">
      <FeaturesTitle title="Lab Report Analyzer" />
      <div className="w-full rounded-xl bg-lightGrey p-3">
        <Formik
          initialValues={{
            symptoms: [],
          }}
        // validationSchema={Yup.object({
        // })}
        // onSubmit={(values, { setSubmitting, resetForm }) => {
        //   hospitalSearch(values.selectedHospital);
        //   setSubmitting(false);
        //   resetForm({});
        // }}
        >
          <Form className="mt-3 flex w-full flex-col">
            <Field
              name="type"
              options={reportOptions}
              component={CustomSelect}
              placeholder="Select Lab report type..."
              isMulti={false}
            />
            <TextInput
              label="Enter value"
              name="value"
              type="number"
              placeholder=""
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
      {/* <div className="flex flex-col gap-3">
        {noResultMessage && (<div className="font-semibold"> Sorry No result Found</div>)}
        {clinics.map((clinic) => (
          <div className="rounded-xl bg-mintGreen p-3" key={clinic._id}>
            <p className="mb-2 text-lg font-semibold capitalize text-blue">
              {clinic.type} clinic
            </p>
            <p className="line-clamp-3 text-blue">Day : {clinic.day}</p>
            <p className="line-clamp-3 text-blue">Time : {clinic.time}</p>
            <p className="line-clamp-3 text-blue">Doctors : {clinic.doctors}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default LabReportAnalyzer;
