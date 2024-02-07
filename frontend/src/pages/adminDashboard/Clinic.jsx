import React, { useEffect, useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

import BASE_URL from "../../config/ApiConfig";
import DeleteClinicModel from "../../modals/DeleteClinicModel";
import UpdateClinicModel from "../../modals/UpdateClinicModel";
import CustomSelect from "../../components/CustomSelect";
import { DeleteIcon, EditIcon } from "../../icons/icon";

import {
    TextInputWithLabel as TextInput,
    TextAreaWithLabel as TextArea,
} from "../../components/FormikElements";

const Clinic = () => {
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);
    const [clinicData, setClinicData] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);
    const [deleteClinic, setdeleteClinic] = useState(null);
    const [updateClinic, setUpdateClinic] = useState([]);
    const [addClinicMessage, setAddClinicMessage] = useState(null);

    const closeDeleteModal = () => {
        setIsDeleteModelOpen(false);
    };
    const openDeleteModal = () => {
        setIsDeleteModelOpen(true);
    };
    const closeUpdateModal = () => {
        setIsUpdateModelOpen(false);
    };
    const openUpdateModal = () => {
        setIsUpdateModelOpen(true);
    };

    const fetchInfo = () => {
        return axios.all([
            axios.get(`${BASE_URL}clinic`)
                .then((response) => {
                    setClinicData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                }),
            axios.get(`${BASE_URL}hospital/`)
                .then((response) => {
                    setHospitalData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        ]);
    }

    const hospitalOptions = hospitalData.map((item) => ({
        label: item.hospital_name,
        value: item._id,
    }));

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="flex flex-row flex-1 ">

            <div className="basis-1/3">
                <Formik
                    initialValues={{
                        type: "",
                        day: "",
                        time: "",
                        doctors: "",
                        additional: "",
                        hospital: "",
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
                            name="additional_dsc"
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

            <div className="flex-1">
                {clinicData.map((dataObj, index) => {
                    const handleDeleteClick = () => {
                        openDeleteModal();
                        setdeleteClinic(dataObj._id);
                    };
                    const handleUpdateClick = () => {
                        openUpdateModal();
                        setUpdateClinic(dataObj)
                        console.log(updateClinic);
                    };
                    return (
                        <div className="border-solid border-2 border-teal p-4 m-2 rounded-2xl flex flex-col gap-6 bg-mintGree" key={index}>
                            <div className="flex flex-row  justify-between">
                                <p className="font-semibold capitalize">{dataObj.type} Clinic</p>
                                <p>{dataObj.day} {dataObj.time}</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p>{dataObj.doctors}</p>
                                    <p>{dataObj.hospital.hospital_name}</p>
                                    <p>{dataObj.additional_dsc}</p>
                                </div>
                                <div>
                                    <button className="text-white bg-redDefault-700 hover:bg-redDefault-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5" onClick={handleDeleteClick}><DeleteIcon fontSize="small" /></button>
                                    <button className="text-white bg-blueDefault-700 hover:bg-blueDefault-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5" onClick={handleUpdateClick}> <EditIcon fontSize="small" /></button>
                                </div>

                            </div>
                        </div>


                    );
                })}

            </div>
            <DeleteClinicModel deleteClinic={deleteClinic} isOpen={isDeleteModelOpen} closeModal={closeDeleteModal} openModal={openDeleteModal} fetchInfo={fetchInfo} />
            <UpdateClinicModel updateClinic={updateClinic} isOpen={isUpdateModelOpen} closeModal={closeUpdateModal} openModal={openUpdateModal} fetchInfo={fetchInfo} hospitalOptions={hospitalOptions} />
        </div >
    );
};

export default Clinic;
