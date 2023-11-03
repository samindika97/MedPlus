import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../../components/FormikElements";
import CustomSelect from "../../components/CustomSelect";

import BASE_URL from "../../config/ApiConfig";

const EditDoctorModal = ({ isModalOpen, modalClose, doctor, setDoctor }) => {
  const [editDoctorMessage, setEditDoctorMessage] = useState(null);

  useEffect(() => {
    setEditDoctorMessage(null);
  }, []);

  const editDoctor = (name, email, specialization) => {
    // setLoading(true);
    const axiosConfig = {
      method: "patch",
      url: `${BASE_URL}doctor/${doctor._id}`,
      data: {
        name: name,
        email: email,
        specialization: specialization,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setDoctor((prev) =>
          prev.map((prevDoctor) => {
            if (prevDoctor._id === response.data.result._id) {
              return {
                ...prevDoctor,
                name: response.data.result.name,
                email: response.data.result.email,
                specialization: response.data.result.specialization,
              };
            } else {
              return prevDoctor;
            }
          }),
        );
        modalClose();
      })
      .catch((err) => {
        setEditDoctorMessage("Doctor with the same name exists");
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-blue"
                >
                  Edit Disease
                </Dialog.Title>
                <div className="mt-2">
                  <Formik
                    initialValues={{
                      name: doctor && doctor.name,
                      email: doctor && doctor.email,
                      specialization: doctor && doctor.specialization,
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("Required"),
                      email: Yup.string().required("Required"),
                      specialization: Yup.string().required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      editDoctor(
                        values.name,
                        values.email,
                        values.specialization,
                      );
                      setSubmitting(false);
                      resetForm({});
                    }}
                  >
                    <Form className="mt-3 flex w-full flex-col text-sm">
                      <TextInput
                        label="Enter doctor name"
                        name="name"
                        type="text"
                        placeholder="Pneumonia"
                      />

                      <TextInput
                        label="Enter email"
                        name="email"
                        type="text"
                        placeholder="Pneumonia is a common and potentially serious respiratory infection that primarily affects the lungs. It can be caused by various..."
                      />

                      <TextInput
                        label="Enter specialization"
                        name="specialization"
                        type="text"
                        placeholder="Pneumonia is a common and potentially serious respiratory infection that primarily affects the lungs. It can be caused by various..."
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

                      {editDoctorMessage && (
                        <div className="mt-3 rounded-lg border border-red p-3">
                          <p className="text-red">{editDoctorMessage}</p>
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

export default EditDoctorModal;
