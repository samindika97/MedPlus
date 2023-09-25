import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextInputWithLabel as TextInput } from "../components/FormikElements";

import BASE_URL from "../config/ApiConfig";

const EditSymptomModal = ({
  isModalOpen,
  modalClose,
  symptom,
  setSymptoms,
}) => {
  const [editSymptomMessage, setEditSymptomMessage] = useState(null);

  useEffect(() => {
    setEditSymptomMessage(null);
  }, []);

  const editSymptom = (name) => {
    // setLoading(true);
    const axiosConfig = {
      method: "patch",
      url: `${BASE_URL}symptoms/${symptom._id}`,
      data: {
        name: name,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setSymptoms((prev) =>
          prev.map((prevSymptom) => {
            if (prevSymptom._id === response.data.result._id) {
              return {
                ...prevSymptom,
                name: response.data.result.name,
              };
            } else {
              return prevSymptom;
            }
          }),
        );
        modalClose();
      })
      .catch((err) => {
        setEditSymptomMessage(
          err.response.data.error.code && err.response.data.error.code === 11000
            ? "Sympyom with the same name exists"
            : "Error editing symptom. Try again",
        );
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-blue"
                >
                  Edit Symptom
                </Dialog.Title>
                <div className="mt-2">
                  <Formik
                    initialValues={{
                      name: symptom.name,
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      editSymptom(values.name);
                      setSubmitting(false);
                      resetForm({});
                    }}
                  >
                    <Form className="mt-3 flex w-full flex-col text-sm">
                      <TextInput
                        label="Enter new symptom name"
                        name="name"
                        type="text"
                        placeholder="Cough"
                      />

                      <div className="flex gap-3">
                        <button
                          className="w-max rounded-md bg-teal px-4 py-2 capitalize"
                          type="submit"
                        >
                          <p className="text-sm font-medium text-white">
                            confirm change
                          </p>
                        </button>
                        <button
                          className="w-max rounded-md bg-grey px-4 py-2 capitalize"
                          type="button"
                          onClick={modalClose}
                        >
                          <p className="text-sm font-medium text-white">
                            cancel
                          </p>
                        </button>
                      </div>

                      {editSymptomMessage && (
                        <div className="border-red mt-3 rounded-lg border p-3">
                          <p className="text-red">{editSymptomMessage}</p>
                        </div>
                      )}
                    </Form>
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditSymptomModal;
