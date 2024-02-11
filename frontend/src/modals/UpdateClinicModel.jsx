import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useFormik, Formik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from "yup";

import CustomSelect from "../components/CustomSelect";

import {
  TextInputWithLabel as TextInput,
  TextAreaWithLabel as TextArea,
} from "../components/FormikElements";


import BASE_URL from "../config/ApiConfig";

export default function UpdateClinicModel({ updateClinic, isOpen, closeModal, openModal, fetchInfo, hospitalOptions }) {

  const [addClinicMessage, setAddClinicMessage] = useState(null);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Clinic
                  </Dialog.Title>
                  <div className="mt-2">
                    <Formik
                      initialValues={{
                        type: updateClinic && updateClinic.type,
                        day: updateClinic && updateClinic.day,
                        time: updateClinic && updateClinic.time,
                        doctors: updateClinic && updateClinic.doctors,
                        additional: updateClinic && updateClinic.additional,
                        hospital: updateClinic && updateClinic.hospital,
                      }}
                      validationSchema={Yup.object({
                        type: Yup.string().required("Required"),
                        day: Yup.string().required("Required"),
                        time: Yup.string().required("Required"),
                        doctors: Yup.string().required("Required"),
                        hospital: Yup.string().required("Required"),
                      })}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                          const form_data = JSON.stringify(values, null, 2);
                          const config = {
                            headers: { "content-type": "application/json" }
                          }
                          await axios.post(`${BASE_URL}clinic`, form_data, config);
                          setSubmitting(false);
                          fetchInfo();
                          resetForm({});
                        } catch (err) {
                          console.log(err);
                          setAddClinicMessage(
                            err.response.data.error.code === 11000
                              ? "Guideline with the same condition exists"
                              : err.response.data.error.message || "An error occurred during submission.",
                          );
                        }
                      }}
                    >
                      <Form className="mt-3 flex w-full flex-col">
                        <TextInput
                          label="Enter Clinic Type"
                          name="type"
                          type="text"
                          placeholder=""
                        />
                        <TextInput
                          label="Enter day "
                          name="day"
                          type="text"
                          placeholder=""
                        />
                        <TextInput
                          label="Enter Time"
                          name="time"
                          type="text"
                          placeholder=""
                        />
                        <TextInput
                          label="Enter doctor names"
                          name="doctors"
                          type="text"
                          placeholder=""
                        />
                        <TextInput
                          label="Enter any additional details"
                          name="additional"
                          type="text"
                          placeholder=""
                        />
                        <Field
                          label="Select hospital from the list"
                          name="hospital"
                          options={hospitalOptions}
                          component={CustomSelect}
                          placeholder="Select hospital"
                          isMulti={false}
                        />
                        <div className="flex">
                          <button
                            className="w-full rounded-xl border-none bg-teal p-3 outline-none"
                            type="submit"
                          >
                            <p className="font-semibold uppercase text-white">add</p>
                          </button>
                        </div>

                        {addClinicMessage && (
                          <div className="mt-3 rounded-lg border border-red p-3 text-center">
                            <p className="text-red">{addClinicMessage}</p>
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
    </>
  )
}
