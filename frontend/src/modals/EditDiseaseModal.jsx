import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../components/FormikElements";
import CustomSelect from "../components/CustomSelect";

import { useEditDiseaseMutation } from "../services/diseaseService";
import { useLazyGetSymptomsQuery } from "../services/symptomsService";

const EditDiseaseModal = ({ isModalOpen, modalClose, disease }) => {
  const [editDisease, { error, isLoading }] = useEditDiseaseMutation();

  const handleEditDisease = async (data) => {
    const res = await editDisease({ id: disease._id, data: data });

    if (res?.data?.status) {
      toast.success(res?.data?.message);
      modalClose();
    }
  };

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

  const symptomOptions =
    isSuccessSymptoms &&
    symptomsData.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));

  useEffect(() => {
    fetchSymptoms({
      fixedCacheKey: "symptoms",
    });
  }, [fetchSymptoms]);

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
              <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-blue"
                >
                  Edit Disease
                </Dialog.Title>
                <div className="mt-2">
                  <Formik
                    initialValues={{
                      name: disease && disease.name,
                      content: disease && disease.content,
                      symptoms:
                        disease &&
                        disease.symptoms.map((symptom) => symptom._id),
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("Required"),
                      content: Yup.string().required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      handleEditDisease(values);
                      setSubmitting(false);
                      resetForm({});
                    }}
                  >
                    <Form className="mt-3 flex w-full flex-col text-sm">
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

                      {/* {editDiseaseMessage && (
                        <div className="mt-3 rounded-lg border border-red p-3">
                          <p className="text-red">{editDiseaseMessage}</p>
                        </div>
                      )} */}
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

export default EditDiseaseModal;
