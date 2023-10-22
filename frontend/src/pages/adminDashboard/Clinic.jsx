import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";

const onSubmit = (values) => {
    const form_data = JSON.stringify(values, null, 2);
    console.log(form_data);
    const config = {
        headers: { "content-type": "application/json" }
    }
    axios.post(`${BASE_URL}clinic`, form_data, config);
    console.log('submitted');
};

const Clinic = () => {
    const [clinicData, setClinicData] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);

    const fetchInfo = () => {
        return axios.all([
            axios.get(`${BASE_URL}clinic`)
                .then((response) => {
                    console.log(response.data);
                    setClinicData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                }),
            axios.get(`${BASE_URL}hospital`)
                .then((response) => {
                    console.log(response.data);
                    setHospitalData(response.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        ]);
    }
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
        <div className="flex flex-row ">
            <form onSubmit={handleSubmit} className="p-5 font-semibold border-2 border-teal rounded-md origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-4">
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
                        console.log(dataObj._id);
                        return (
                            <option value={dataObj._id} key={dataObj._id} id={dataObj._id}>{dataObj.hospital_name}</option>
                        );
                    })
                    }
                </select>
                <br ></br>
                <input type="submit" className="bg-blueDefault-500 hover:bg-blueDefault-700 text-white font-bold py-2 px-4 my-8 rounded focus:outline-none focus:shadow-outline" value="Contact Us" />

            </form>
            <div>
                {clinicData.map((dataObj, index) => {
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
                        </div>

                    );
                })}

            </div>
        </div>
    );
};

export default Clinic;
