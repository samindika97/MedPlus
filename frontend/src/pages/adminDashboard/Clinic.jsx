import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";
import DeleteClinicModel from "../../modals/DeleteClinicModel";
import UpdateClinicModel from "../../modals/UpdateClinicModel";



const Clinic = () => {
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);
    const [clinicData, setClinicData] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);
    const [deleteClinic, setdeleteClinic] = useState([]);
    const [updateClinic, setUpdateClinic] = useState([]);

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
            axios.get(`${BASE_URL}hospital`)
                .then((response) => {
                    setHospitalData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        ]);
    }
    const onSubmit = (values) => {
        const form_data = JSON.stringify(values, null, 2);
        console.log(form_data);
        const config = {
            headers: { "content-type": "application/json" }
        }
        axios.post(`${BASE_URL}clinic`, form_data, config);
        fetchInfo();
        console.log('submitted');
    };
    useEffect(() => {
        fetchInfo();
    }, []);

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            type: "",
            day: "",
            time: "",
            doctors: "",
            additional: "",
            hospital: "",
        },
        onSubmit
    });
    return (
        <div className="flex flex-row flex-1 ">

            <div className="">
                <form onSubmit={handleSubmit} className="p-5 pt-1 font-semibold border-2 border-teal rounded-md origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                        <p className="text-lg font-semibold capitalize text-blue pb-2">
                            add new clinic
                        </p>
                        <label htmlFor="type">Clinic Type</label>
                        <input
                            type="text"
                            id="type"
                            className={errors.type && touched.type ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-teal"}
                            value={values.type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.type && touched.type && <p className="text-redDefault-500 text-xs italic">{errors.type}</p>}
                    </div>
                    <div className="py-4">
                        <label htmlFor="day">Day</label>
                        <input
                            type="text"
                            id="day"
                            className={errors.day && touched.day ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-teal"}
                            value={values.day}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.day && touched.day && <p className="text-redDefault-500 text-xs italic">{errors.day}</p>}
                    </div>
                    <div className="py-4">
                        <label htmlFor="time">Time</label>
                        <input
                            type="text"
                            id="time"
                            className={errors.time && touched.time ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-teal"}
                            value={values.time}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.time && touched.time && <p className="text-redDefault-500 text-xs italic">{errors.time}</p>}
                    </div>
                    <div className="py-4">
                        <label htmlFor="doctors">Doctors</label>
                        <input
                            type="text"
                            id="doctors"
                            className={errors.doctors && touched.doctors ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-teal"}
                            value={values.doctors}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.doctors && touched.doctors && <p className="text-redDefault-500 text-xs italic">{errors.doctors}</p>}
                    </div>
                    <div className="py-4">
                        <label htmlFor="additional">Additional data</label>
                        <input
                            type="text"
                            id="additional"
                            className={"shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-teal"}
                            value={values.additional}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.additional && touched.additional && <p className="text-redDefault-500 text-xs italic">{errors.doctors}</p>}
                    </div>
                    <label htmlFor="hospital">Hospital</label>
                    <br />
                    <select
                        id="hospital"
                        className="py-4 font-light"
                        value={values.hospital}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        <option value="">Select Hospital From the List</option>
                        {hospitalData.map((dataObj) => {
                            return (
                                <option value={dataObj._id} key={dataObj._id} id={dataObj._id}>{dataObj.hospital_name}</option>
                            );
                        })
                        }
                    </select>
                    <br ></br>
                    <input type="submit" className="bg-blueDefault-500 hover:bg-blueDefault-700 text-white font-bold py-2 px-4 my-8 rounded focus:outline-none focus:shadow-outline" value="Submit" />

                </form>
            </div>

            <div className="flex-1">
                {clinicData.map((dataObj, index) => {
                    const handleDeleteClick = () => {
                        openDeleteModal();
                        setdeleteClinic(dataObj._id);
                    };
                    const handleUpdateClick = ()=>{
                        openUpdateModal();
                        setUpdateClinic(dataObj._id)
                    };
                    return (
                        <div className="border-solid border-2 border-teal p-4 m-2 rounded-2xl flex flex-col gap-6 bg-mintGree" key={index}>
                            <div>
                                <p>Clinc Type : {dataObj.type}</p>
                                <p>{dataObj.day} {dataObj.time}</p>
                            </div>
                            <div>
                                <p>{dataObj.doctors}</p>
                                <p>{dataObj.hospital.hospital_name}</p>
                            </div>
                            <p>{dataObj.additional_dsc}</p>

                            <div>
                                <button className="text-white bg-blueDefault-700 hover:bg-blueDefault-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5" onClick={handleDeleteClick}>Delete</button>
                                <button className="text-white bg-blueDefault-700 hover:bg-blueDefault-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5" onClick={handleUpdateClick}>Update</button>

                            </div>
                        </div>


                    );
                })}

            </div>
            <DeleteClinicModel deleteClinic={deleteClinic} isOpen={isDeleteModelOpen} closeModal={closeDeleteModal} openModal={openDeleteModal} fetchInfo={fetchInfo}/>
            <UpdateClinicModel updateClinic={updateClinic} isOpen={isUpdateModelOpen} closeModal={closeUpdateModal} openModal={openUpdateModal} fetchInfo={fetchInfo} hospitalData={hospitalData}/>
        </div >
    );
};

export default Clinic;
