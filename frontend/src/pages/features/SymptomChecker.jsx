import React, { useState, useEffect, Fragment } from "react";
import queryString from "query-string";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { CheckIcon, ExpandIcon, SearchIcon } from "../../icons/icon";

import FeaturesTitle from "../../components/FeaturesTitle";
import CustomSelect from "../../components/CustomSelect";

import { urlSlug } from "../../utils/urlSlug";

import {
  useLazyGetSymptomsQuery,
  useLazySymptomSearchQuery,
} from "../../services/symptomsService";

const SymptomChecker = () => {
  const navigate = useNavigate();

  const [
    fetchSymptoms,
    {
      isSuccess: isSuccessSymptoms,
      data: symptomsData,
      isError: isErrorSymptoms,
      error: symptomError,
      isFetching: isFetchingSymptoms,
    },
  ] = useLazyGetSymptomsQuery();

  const [
    fetchSymptomSearch,
    {
      isSuccess: isSuccessSymptomSearch,
      data: symptomSearchData,
      isError: isErrorSymptomSearch,
      error: symptomSearchError,
      isFetching: isFetchingSymptomSearch,
    },
  ] = useLazySymptomSearchQuery();

  const symptomOptions =
    symptomsData &&
    symptomsData.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));

  const symptomSearch = (selectedSymptoms) => {
    const serializedSymptomArray = queryString.stringify({
      symptomArray: selectedSymptoms,
    });

    fetchSymptomSearch({ string: serializedSymptomArray });
  };

  useEffect(() => {
    fetchSymptoms({
      fixedCacheKey: "symptoms",
    });
  }, [fetchSymptoms]);
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
        {isSuccessSymptomSearch &&
          symptomSearchData.data.map((disease) => (
            <div
              className="rounded-xl bg-mintGreen p-3 cursor-pointer"
              key={disease._id}
              onClick={() =>
                navigate(`${urlSlug.FEATURE.HEALTH_DIRECTORY}/${disease._id}`)
              }
            >
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
