import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import DeleteDiseaseModal from "../../modals/DeleteDiseaseModal";
import EditDiseaseModal from "../../modals/EditDiseaseModal";
import { DeleteIcon, EditIcon } from "../../icons/icon";
import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../../components/FormikElements";
import CustomSelect from "../../components/CustomSelect";

import BASE_URL from "../../config/ApiConfig";

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [addDiseasesMessage, setAddDiseasesMessage] = useState(null);
  const [editDiseasesModalOpen, setEditDiseasesModalOpen] = useState(false);
  const [editModalDiseases, setEditModalDiseases] = useState(null);
  const [deleteDiseasesModalOpen, setDeleteDiseasesModalOpen] = useState(false);
  const [deleteModalDiseases, setDeleteModalDiseases] = useState(null);

  const symptomOptions = symptoms.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const addDisease = (name, content, symptoms) => {
    // setLoading(true);
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}diseases/`,
      data: {
        name: name,
        content: content,
        symptoms: symptoms,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setDiseases((prev) => [response.data.result, ...prev]);
      })
      .catch((err) => {
        setAddDiseasesMessage(
          err.response.data.error.code
            ? err.response.data.error.code === 11000 &&
                "Sympyom with the same name exists"
            : err.response.data.error.message &&
                err.response.data.error.message,
        );
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const fetchDiseases = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}diseases/`,
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
    fetchDiseases();
  }, []);

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
            setAddDiseasesMessage(null);
            addDisease(values.name, values.content, values.symptoms);
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

            {addDiseasesMessage && (
              <div className="mt-3 rounded-lg border border-red p-3 text-center">
                <p className="text-red">{addDiseasesMessage}</p>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      <div className="flex w-full flex-col gap-3">
        {diseases &&
          diseases.map((disease) => (
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
            setDiseases={setDiseases}
          />
        )}
        {deleteModalDiseases && (
          <DeleteDiseaseModal
            isModalOpen={deleteDiseasesModalOpen}
            modalClose={closeDeleteDiseasesModal}
            disease={deleteModalDiseases}
            setDiseases={setDiseases}
          />
        )}
      </div>
    </div>
  );
};

export default Diseases;
