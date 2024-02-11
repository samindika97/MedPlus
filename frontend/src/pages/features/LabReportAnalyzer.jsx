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
  const [noResultMessage, setNoResultMessage] = useState(null);
  const [guidline, setGuidline] = useState(null);

  const reportOptions = reportTypes.map((item, index) => ({
    label: item,
    value: item,
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
          initialValues={
            {
              type: "",
              value: ""
            }
          }
          // validationSchema={Yup.object({
          // })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const form_data = JSON.stringify(values, null, 2);
              console.log(form_data);
              const config = {
                headers: { "content-type": "application/json" }
              }
              await axios.post(`${BASE_URL}guidline/condition`, form_data, config).then((response) => {
                setNoResultMessage(false);
                setGuidline(response.data);
                //console.log(response.data);
              });
              setSubmitting(false);
              fetchLabReportTypes();
              resetForm({});
            } catch (error) {
              setNoResultMessage(true);
              console.log(error);

            }
          }}
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
      <div className="flex flex-col gap-3">
        {noResultMessage && (<div className="font-semibold"> Sorry No result Found</div>)}
        {guidline != null &&
          <div className="rounded-xl bg-mintGreen p-3" key={guidline._id}>
            <p className="mb-2 text-lg font-semibold capitalize text-blue">
              {guidline.condition}
            </p>
            <p className="mb-2">{guidline.description}</p>
            <p className="mb-2 font-semibold">Recommendation</p>
            <p>{guidline.recommendations}</p>
          </div>}
      </div>
    </div >
  );
};

export default LabReportAnalyzer;
