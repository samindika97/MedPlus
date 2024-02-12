import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { TextInputWithLabel as TextInput } from "../../components/FormikElements";
import * as Yup from 'yup';
import { DeleteIcon, EditIcon } from "../../icons/icon";

import DeleteHospital from "../../modals/DeleteHospitalModel";
import EditHospital from "../../modals/EditHospitalModel";

import BASE_URL from "../../config/ApiConfig";

const Hospital = () => {
    const [data, setData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addHospitalMessage, setAddHospitalMessage] = useState(false);

    const fetchInfo = () => {
        return axios.get(`${BASE_URL}hospital`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const openEditModal = (hospital) => {
        setSelectedHospital(hospital);
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedHospital(null);
    }

    const openDeleteModal = (hospital) => {
        setSelectedHospital(hospital);
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedHospital(null);
    }

    return (
        <div className="flex flex-row flex-1">
            {/* Add New Hospital Section */}
            <div className="">
                <div className="flex h-full w-full flex-col gap-3">
                    <div className="w-full rounded-xl border border-gray-300 p-4">
                        <p className="text-lg font-semibold capitalize text-blue-500">
                            Add New Hospital
                        </p>
                        <Formik
                            initialValues={{
                                hospital_name: "",
                                location: "",
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
                                    await axios.post(`${BASE_URL}hospital`, form_data, config);
                                    setSubmitting(false);
                                    fetchInfo();
                                    resetForm({});
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
                </div>
            </div>

            {/* Display Existing Hospitals Section */}
            <div className="flex-1">
                {data.map((dataObj, index) => (
                    <div className="p-2 m-2" key={index}>
                        <div className="flex flex-row gap-3 rounded-lg border border-blue bg-mintGreen p-2">
                            <div>
                                <p>Hospital name : {dataObj.hospital_name}</p>
                                <p>Location : {dataObj.location}</p>
                            </div>
                            <div className="flex flex-row gap-3 my-2">
                                <button onClick={() => openEditModal(dataObj)}>
                                    <EditIcon fontSize="medium"></EditIcon>
                                </button>
                                <button onClick={() => openDeleteModal(dataObj)}>
                                    <DeleteIcon fontSize="medium"></DeleteIcon>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Hospital Modal */}
            {showEditModal && (
                <EditHospital
                    isModalOpen={showEditModal}
                    modalClose={closeEditModal}
                    hospital={selectedHospital}
                    fetchInfo={fetchInfo}
                />
            )}

            {/* Delete Hospital Modal */}
            {showDeleteModal && (
                <DeleteHospital
                    isModalOpen={showDeleteModal}
                    modalClose={closeDeleteModal}
                    hospital={selectedHospital}
                    fetchInfo={fetchInfo}
                />
            )}
        </div>
    );
}

export default Hospital;
