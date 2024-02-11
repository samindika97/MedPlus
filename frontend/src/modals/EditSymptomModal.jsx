import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { TextInputWithLabel as TextInput } from "../components/FormikElements";

import { useEditSymptomMutation } from "../services/symptomsService";

const EditSymptomModal = ({ isModalOpen, modalClose, symptom }) => {
  const [editSymptom, { error, isLoading }] = useEditSymptomMutation();

  const handleEditSymptom = async (data) => {
    const res = await editSymptom({ id: symptom._id, data: data });

    if (res?.data?.status) {
      toast.success(res?.data?.message);
      modalClose();
    }
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
                      handleEditSymptom(values);
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
                          {!isLoading ? (
                            <p className="text-sm font-medium text-white">
                              confirm change
                            </p>
                          ) : (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-grey border-t-white" />
                          )}
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

                      {error && (
                        <div className="mt-3 rounded-lg border border-red p-3">
                          <p className="text-red">{error}</p>
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
