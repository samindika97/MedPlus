import React, { useEffect, useState } from "react";
import { useFormik, Formik, Form } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { DeleteIcon, EditIcon } from "../../icons/icon";

import { TextInputWithLabel as TextInput, TextAreaWithLabel } from "../../components/FormikElements";
import  EditGuidline  from "../../modals/EditGuidlineModel";
import  DeleteGuidline  from "../../modals/DeleteGuidlineModel";



import BASE_URL from "../../config/ApiConfig";


const Report = () => {
    const [selectedGuidline, setSelectedGuidline] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addGuidlineMessage, setAddGuidlineMessage] = useState(null);


    const openEditModal = (guidline) => {
        setSelectedGuidline(guidline);
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedGuidline(null);
    }

    const openDeleteModal = (guidline) => {
        setSelectedGuidline(guidline);
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedGuidline(null);
    }

    const closeEditGuidlineModal = () => {
        setShowEditModal(false);
      };

      
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return axios.get(`${BASE_URL}guidline`)
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

    return (
        <div className="flex flex-row flex-1">
            {/* Add New coondition Section */}
            <div className="basis-1/4">
                <div className="flex h-full w-full flex-col gap-3">
                    <div className="w-full rounded-xl border border-gray-300 p-4">
                        <p className="text-lg font-semibold capitalize text-blue-500">
                            Add New Lab Report Data
                        </p>
                        <Formik
                            initialValues={{
                                type: "",
                                max_value: "",
                                min_value: "",
                                condition: "",
                                description: "",
                                recommendations: "",
                            }}
                            validationSchema={Yup.object({
                                type: Yup.string().required("Required"),
                                max_value: Yup.string().required("Required"),
                                min_value: Yup.string().required("Required"),
                                condition: Yup.string().required("Required"),
                                description: Yup.string().required("Required"),
                                recommendations: Yup.string().required("Required"),
                            })}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    const form_data = JSON.stringify(values, null, 2);
                                    const config = {
                                        headers: { "content-type": "application/json" }
                                    }
                                    await axios.post(`${BASE_URL}guidline`, form_data, config);
                                    setSubmitting(false);
                                    fetchInfo();
                                    resetForm({});
                                } catch (err) {
                                    console.log(err);
                                    setAddGuidlineMessage(
                                        err.response.data.error.code === 11000
                                            ? "Guideline with the same condition exists"
                                            : err.response.data.error.message || "An error occurred during submission.",
                                    );
                                }
                            }}
                        >
                            <Form className="mt-3 flex flex-col">
                                <TextInput
                                    label="Enter report type"
                                    name="type"
                                    type="text"
                                    placeholder="Blood report, Urine report..."
                                />
                                <TextInput
                                    label="Enter Maximum value"
                                    name="max_value"
                                    type="number"
                                    placeholder=""
                                />
                                <TextInput
                                    label="Enter Minimum value"
                                    name="min_value"
                                    type="number"
                                    placeholder=""
                                />
                                <TextInput
                                    label="Enter Condition Name"
                                    name="condition"
                                    type="text"
                                    placeholder=""
                                />
                                <TextAreaWithLabel
                                    label="Enter Description About Condition"
                                    name="description"
                                    type="text"
                                    placeholder=""
                                />
                                <TextAreaWithLabel
                                    label="Enter Recomendation For Condition"
                                    name="recommendations"
                                    type="text"
                                    placeholder=""
                                />
                                {addGuidlineMessage && (
                                    <div className="mt-3 rounded-lg border border-red p-3 text-center">
                                        <p className="text-red">{addGuidlineMessage}</p>
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
            <div className="flex-1">
                {data.map((dataObj, index) => (
                    <div className="p-2 m-2" key={index}>
                        <div className="flex flex-col gap-3 rounded-lg border border-blue bg-mintGreen p-2">
                            <div>
                                <p>Report type : {dataObj.type}</p>
                                <p>Range:{dataObj.min_value}-{dataObj.max_value}</p>
                                <p>Condition : {dataObj.condition}</p>
                                <p>Description : {dataObj.description}</p>
                                <p>Recommendations : {dataObj.recommendations}</p>
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
            {/* Edit Guidline Modal */}
            {showEditModal && (
                <EditGuidline
                isModalOpen={showEditModal}
                modalClose={closeEditModal}
                guidline={selectedGuidline}
                fetchInfo = {fetchInfo}
              />
            )}

            {/* Delete guidline Modal */}
            {showDeleteModal && (
                <DeleteGuidline
                isModalOpen={showDeleteModal}
                modalClose={closeDeleteModal}
                guidline={selectedGuidline}
                fetchInfo = {fetchInfo}
              />
            )}
        </div>
    );
}

export default Report;

