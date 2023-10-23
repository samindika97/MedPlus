import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import DeleteSymptomModal from "../../modals/DeleteSymptomModal";
import EditSymptomModal from "../../modals/EditSymptomModal";
import { DeleteIcon, EditIcon, SearchIcon } from "../../icons/icon";
import { TextInputWithLabel as TextInput } from "../../components/FormikElements";

import BASE_URL from "../../config/ApiConfig";

const Symptoms = () => {
  const [searchSymptoms, setSearchSymptoms] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [addSymptomMessage, setAddSymptomMessage] = useState(null);
  const [editSymptomModalOpen, setEditSymptomModalOpen] = useState(false);
  const [editModalSymptom, setEditModalSymptom] = useState(null);
  const [deleteSymptomModalOpen, setDeleteSymptomModalOpen] = useState(false);
  const [deleteModalSymptom, setDeleteModalSymptom] = useState(null);
  const [clickedSymptom, setClickedSymptom] = useState(null);
  const [associatedDiseases, setAssociatedDiseases] = useState([]);

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

  const getAssociatedDiseases = (symptom) => {
    // setLoading(true);
    setClickedSymptom(symptom);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}symptoms/associatedDiseases/${symptom._id}`,
    };
    axios(axiosConfig)
      .then((response) => {
        setAssociatedDiseases(response.data.result);
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

  const filteredSymptoms = symptoms.filter((symptom) => {
    return symptom.name.includes(searchSymptoms);
  });

  return (
    <div className="flex w-full gap-5">
      <div className="flex h-full w-1/3 flex-col gap-3">
        <div className="w-full rounded-xl border border-grey p-3">
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
              setAddSymptomMessage(null);
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
                <button
                  className="w-full rounded-xl border-none bg-teal p-3 outline-none"
                  type="submit"
                >
                  <p className="font-semibold uppercase text-white">add</p>
                </button>
              </div>

              {addSymptomMessage && (
                <div className="mt-3 rounded-lg border border-red p-3 text-center">
                  <p className="text-red">{addSymptomMessage}</p>
                </div>
              )}
            </Form>
          </Formik>
        </div>
        <div className="h-full w-full rounded-xl border border-grey p-3">
          <p className="mb-3 text-lg font-semibold capitalize text-blue">
            associated diseases
          </p>
          {clickedSymptom ? (
            <>
              <p className="font-semibold capitalize ">
                {clickedSymptom.name} :{" "}
              </p>
              <ul className="ml-5 list-disc">
                {associatedDiseases &&
                  associatedDiseases.map((disease) => (
                    <li key={disease._id}>{disease.name}</li>
                  ))}
              </ul>
            </>
          ) : (
            <p className="text-sm italic">
              Click on a symptom to view it's associated diseases
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-end">
        <div className="mb-5 flex gap-2">
          <input
            className="rounded-lg border border-grey p-2 outline-none"
            onChange={(e) => setSearchSymptoms(e.target.value)}
            value={searchSymptoms}
          />
          <div className="w-max rounded-lg bg-teal p-2">
            <SearchIcon className="text-white" />
          </div>
        </div>
        <div className="flex max-h-96 w-full flex-col gap-3 overflow-y-auto">
          {symptoms &&
            filteredSymptoms.map((symptom) => (
              <div
                className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-lightGrey p-3"
                key={symptom._id}
                onClick={() => getAssociatedDiseases(symptom)}
              >
                <p className="font-semibold capitalize">{symptom.name}</p>
                <div className="flex gap-5">
                  <button
                    className="flex items-center gap-1 rounded-lg border border-blue px-3 py-1 text-blue outline-none"
                    onClick={() => openEditSymptomModal(symptom)}
                  >
                    <EditIcon fontSize="small" />
                    <p className="text-sm font-semibold uppercase">edit</p>
                  </button>
                  <button
                    className="flex items-center gap-1 rounded-lg border border-red px-3 py-1 text-red outline-none"
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
    </div>
  );
};

export default Symptoms;
