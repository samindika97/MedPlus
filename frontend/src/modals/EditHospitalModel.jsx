import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
    TextInputWithLabel as TextInput,
} from "../components/FormikElements";

import BASE_URL from "../config/ApiConfig";

const EditHospital = ({
    isModalOpen,
    modalClose,
    hospital,
    fetchInfo,
}) => {

    const [addHospitalMessage, setAddHospitalMessage] = useState(null);

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
                                            hospital_name: hospital.hospital_name,
                                            location: hospital.location,
                                        }}
                                        validationSchema={Yup.object({
                                            hospital_name: Yup.string().required("Required"),
                                            location: Yup.string().required("Required"),
                                        })}
                                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                                            try {
                                                const form_data = JSON.stringify(values, null, 2);
                                                const config = {
                                                    headers: { "content-type": "application/json" }
                                                }
                                                await axios.put(`${BASE_URL}hospital/${hospital._id}`, form_data, config);
                                                setSubmitting(false);
                                                fetchInfo();
                                                resetForm({});
                                                modalClose();
                                            } catch (err) {
                                                setAddHospitalMessage(
                                                    err.response.data.error.code
                                                        ? err.response.data.error.code === 11000 &&
                                                        "Hospital with the same name exists"
                                                        : err.response.data.error.message &&
                                                        err.response.data.error.message,
                                                );
                                            }
                                        }}
                                    >
                                        <Form className="mt-3 flex flex-col">
                                            <TextInput
                                                label="Enter Name"
                                                name="hospital_name"
                                                type="text"
                                                placeholder="Hospital name"
                                            />

                                            <TextInput
                                                label="Enter Location"
                                                name="location"
                                                type="text"
                                                placeholder="City"
                                            />
                                            {addHospitalMessage && (
                                                <div className="mt-3 rounded-lg border border-red p-3 text-center">
                                                    <p className="text-red">{addHospitalMessage}</p>
                                                </div>
                                            )}
                                            <div className="flex">
                                                <button
                                                    className="w-full rounded-xl bg-teal p-3 text-white hover:bg-teal-600"
                                                    type="submit"
                                                >
                                                    <p className="font-semibold uppercase">Add</p>
                                                </button>
                                            </div>
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

export default EditHospital;
