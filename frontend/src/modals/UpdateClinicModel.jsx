import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useFormik } from "formik";
import axios from 'axios';

import BASE_URL from "../config/ApiConfig";

export default function UpdateClinicModel({deleteClinic, isOpen, closeModal, openModal , fetchInfo, hospitalData}) {
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

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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
