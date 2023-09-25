import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import DeleteSymptomModal from "../../modals/DeleteSymptomModal";
import EditSymptomModal from "../../modals/EditSymptomModal";
import { DeleteIcon, EditIcon } from "../../icons/icon";
import { TextInputWithLabel as TextInput } from "../../components/FormikElements";

import BASE_URL from "../../config/ApiConfig";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [addSymptomMessage, setAddSymptomMessage] = useState(null);
  const [editSymptomModalOpen, setEditSymptomModalOpen] = useState(false);
  const [editModalSymptom, setEditModalSymptom] = useState(null);
  const [deleteSymptomModalOpen, setDeleteSymptomModalOpen] = useState(false);
  const [deleteModalSymptom, setDeleteModalSymptom] = useState(null);

  const addSymptom = (name) => {
    // setLoading(true);
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}symptoms/`,
      data: {
        name: name,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setSymptoms((prev) => [response.data.result, ...prev]);
      })
      .catch((err) => {
        setAddSymptomMessage(
          err.response.data.error.code && err.response.data.error.code === 11000
            ? "Sympyom with the same name exists"
            : "Error adding symptom. Try again",
        );
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

  const closeEditSymptomModal = () => {
    setEditSymptomModalOpen(false);
  };

  const openEditSymptomModal = (symptom) => {
    setEditModalSymptom(symptom);
    setEditSymptomModalOpen(true);
  };

  const closeDeleteSymptomModal = () => {
    setDeleteSymptomModalOpen(false);
  };

  const openDeleteSymptomModal = (symptom) => {
    setDeleteModalSymptom(symptom);
    setDeleteSymptomModalOpen(true);
  };

  return (
    <div className="flex w-full gap-5">
      <div className="h-full w-1/4 rounded-xl border border-grey p-3">
        <p className="text-lg font-semibold capitalize text-blue">
          add new symptom
        </p>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setAddSymptomMessage(null)
            addSymptom(values.name);
            setSubmitting(false);
            resetForm({});
          }}
        >
          <Form className="mt-3 flex w-full flex-col">
            <TextInput
              label="Enter symptom name"
              name="name"
              type="text"
              placeholder="Cough"
            />

            <div className="flex">
              <button className="w-full rounded-xl bg-teal p-3 outline-none border-none" type="submit">
                <p className="font-semibold uppercase text-white">add</p>
              </button>
            </div>

            {addSymptomMessage && (
              <div className="border-red mt-3 rounded-lg border p-3 text-center">
                <p className="text-red">{addSymptomMessage}</p>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      <div className="flex w-full flex-col gap-3">
        {symptoms &&
          symptoms.map((symptom) => (
            <div
              className="flex w-full items-center justify-between rounded-xl bg-mintGreen p-3"
              key={symptom._id}
            >
              <p className="capitalize">{symptom.name}</p>
              <div className="flex gap-5">
                <button
                  className="flex items-center gap-1 rounded-lg border-none bg-teal px-3 py-1 text-blue outline-none"
                  onClick={() => openEditSymptomModal(symptom)}
                >
                  <EditIcon fontSize="small" />
                  <p className="text-sm font-semibold uppercase">edit</p>
                </button>
                <button
                  className="flex items-center gap-1 rounded-lg border-none bg-teal px-3 py-1 text-blue outline-none"
                  onClick={() => openDeleteSymptomModal(symptom)}
                >
                  <DeleteIcon fontSize="small" />
                  <p className="text-sm font-semibold uppercase">delete</p>
                </button>
              </div>
            </div>
          ))}
        {editModalSymptom && (
          <EditSymptomModal
            isModalOpen={editSymptomModalOpen}
            modalClose={closeEditSymptomModal}
            symptom={editModalSymptom}
            setSymptoms={setSymptoms}
          />
        )}
        {deleteModalSymptom && (
          <DeleteSymptomModal
            isModalOpen={deleteSymptomModalOpen}
            modalClose={closeDeleteSymptomModal}
            symptom={deleteModalSymptom}
            setSymptoms={setSymptoms}
          />
        )}
      </div>
    </div>
  );
};

export default Symptoms;
