import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import DeleteDiseaseModal from "../../modals/DeleteDiseaseModal";
import EditDiseaseModal from "../../modals/EditDiseaseModal";
import { DeleteIcon, EditIcon, SearchIcon } from "../../icons/icon";
import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../../components/FormikElements";
import CustomSelect from "../../components/CustomSelect";

import {
  useLazyGetDiseasesQuery,
  useAddDiseaseMutation,
} from "../../services/diseaseService";

import { useLazyGetSymptomsQuery } from "../../services/symptomsService";

const Diseases = () => {
  const [searchDiseases, setSearchDiseases] = useState("");
  const [editDiseasesModalOpen, setEditDiseasesModalOpen] = useState(false);
  const [editModalDiseases, setEditModalDiseases] = useState(null);
  const [deleteDiseasesModalOpen, setDeleteDiseasesModalOpen] = useState(false);
  const [deleteModalDiseases, setDeleteModalDiseases] = useState(null);

  const [
    fetchDiseases,
    {
      isSuccess: isSuccessDiseases,
      data: diseasesData,
      isError: isErrorDiseases,
      error: diseaseError,
      isFetching: isFetchingDiseases,
    },
  ] = useLazyGetDiseasesQuery();

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
    addDisease,
    { error: addDiseaseError, isLoading: isLoadingAddDisease },
  ] = useAddDiseaseMutation();

  const handleAddDisease = async (data) => {
    const res = await addDisease(data);

    if (res?.data?.status) {
      toast.success("Disease added successfully");
    }
  };

  useEffect(() => {
    fetchDiseases({
      fixedCacheKey: "diseases",
    });
  }, [fetchDiseases]);

  useEffect(() => {
    fetchSymptoms({
      fixedCacheKey: "symptoms",
    });
  }, [fetchSymptoms]);

  const symptomOptions =
    isSuccessSymptoms &&
    symptomsData.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));

  const closeEditDiseasesModal = () => {
    setEditDiseasesModalOpen(false);
  };

  const openEditDiseasesModal = (disease) => {
    setEditModalDiseases(disease);
    setEditDiseasesModalOpen(true);
  };

  const closeDeleteDiseasesModal = () => {
    setDeleteDiseasesModalOpen(false);
  };

  const openDeleteDiseasesModal = (disease) => {
    setDeleteModalDiseases(disease);
    setDeleteDiseasesModalOpen(true);
  };

  const filteredDiseases =
    isSuccessDiseases &&
    diseasesData.data.filter((disease) => {
      return disease.name.includes(searchDiseases);
    });

  return (
    <div className="flex w-full gap-5">
      <div className="h-full w-1/3 rounded-xl border border-grey p-3">
        <p className="text-lg font-semibold capitalize text-blue">
          add new disease
        </p>
        <Formik
          initialValues={{
            name: "",
            content: "",
            symptoms: [],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            content: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleAddDisease(values);
            setSubmitting(false);
            resetForm({});
          }}
        >
          <Form className="mt-3 flex w-full flex-col">
            <TextInput
              label="Enter disease name"
              name="name"
              type="text"
              placeholder="Pneumonia"
            />

            <TextArea
              label="Enter disease content"
              name="content"
              type="text"
              rows="5"
              placeholder="Pneumonia is a common and potentially serious respiratory infection that primarily affects the lungs. It can be caused by various..."
            />

            <Field
              name="symptoms"
              options={symptomOptions}
              component={CustomSelect}
              placeholder="Select symptoms..."
              isMulti={true}
            />

            <div className="flex">
              <button
                className="w-full rounded-xl border-none bg-teal p-3 outline-none"
                type="submit"
              >
                <p className="font-semibold uppercase text-white">add</p>
              </button>
            </div>

            {/* {addDiseasesMessage && (
              <div className="mt-3 rounded-lg border border-red p-3 text-center">
                <p className="text-red">{addDiseasesMessage}</p>
              </div>
            )} */}
          </Form>
        </Formik>
      </div>
      <div className="flex w-full flex-col items-end">
        <div className="mb-5 flex gap-2">
          <input
            className="rounded-lg border border-grey p-2 outline-none"
            onChange={(e) => setSearchDiseases(e.target.value)}
            value={searchDiseases}
          />
          <div className="w-max rounded-lg bg-teal p-2">
            <SearchIcon className="text-white" />
          </div>
        </div>
        <div className="flex max-h-96 w-full flex-col gap-3 overflow-y-auto">
          {isSuccessDiseases &&
            filteredDiseases.map((disease) => (
              <div
                className="flex w-full flex-col rounded-xl bg-lightGrey p-3"
                key={disease._id}
              >
                <div className="mb-2 flex w-full items-center justify-between">
                  <p className="font-semibold capitalize">{disease.name}</p>
                  <div className="flex gap-5">
                    <button
                      className="flex items-center gap-1 rounded-lg border border-blue px-3 py-1 text-blue outline-none"
                      onClick={() => openEditDiseasesModal(disease)}
                    >
                      <EditIcon fontSize="small" />
                      <p className="text-sm font-semibold uppercase">edit</p>
                    </button>
                    <button
                      className="flex items-center gap-1 rounded-lg border border-red px-3 py-1 text-red outline-none"
                      onClick={() => openDeleteDiseasesModal(disease)}
                    >
                      <DeleteIcon fontSize="small" />
                      <p className="text-sm font-semibold uppercase">delete</p>
                    </button>
                  </div>
                </div>
                <p className="text-sm capitalize">{disease.content}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {disease.symptoms &&
                    disease.symptoms.map((symptom) => (
                      <div
                        className="rounded-lg bg-grey px-3 py-1"
                        key={symptom.name}
                      >
                        <p className="text-sm font-semibold">{symptom.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          {editModalDiseases && (
            <EditDiseaseModal
              isModalOpen={editDiseasesModalOpen}
              modalClose={closeEditDiseasesModal}
              disease={editModalDiseases}
            />
          )}
          {deleteModalDiseases && (
            <DeleteDiseaseModal
              isModalOpen={deleteDiseasesModalOpen}
              modalClose={closeDeleteDiseasesModal}
              disease={deleteModalDiseases}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Diseases;
