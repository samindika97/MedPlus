import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TextInputWithLabel as TextInput } from "../../components/FormikElements";
import { DeleteIcon, EditIcon, SearchIcon } from "../../icons/icon";
//import { toast } from "react-toastify";
import * as Yup from "yup";
import DeleteDoctorModal from "../../modals/doctorModals/deleteDocotorModal";
import EditDoctorModal from "../../modals/doctorModals/editDoctorModal";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";
const Doctors = () => {
  const [doctors, setDoctor] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [addDoctorMessage, setAddDoctorMessage] = useState(null);
  const [editDoctorModalOpen, setEditDoctorModalOpen] = useState(false);
  const [editModalDoctor, setEditModalDoctor] = useState(null);
  const [deleteDoctorModalOpen, setDeleteDoctorModalOpen] = useState(false);
  const [deleteModalDoctor, setDeleteModalDoctor] = useState(null);

  const addDoctor = (name, email, specialization) => {
    // setLoading(true);
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}doctor/`,
      data: {
        name: name,
        email: email,
        specialization: specialization,
      },
    };

    axios(axiosConfig)
      .then((response) => {
        setDoctor((prev) => [response.data.result, ...prev]);
        // Display a success toast message
        setAddDoctorMessage("Doctor added successfully");
      })
      .catch((err) => {
        setAddDoctorMessage("Doctor with the same name exists");
      });
  };

  const fetchDoctor = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}doctor/`,
    };
    axios(axiosConfig)
      .then((response) => {
        setDoctor(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const closeEditDoctorModal = () => {
  setEditDoctorModalOpen(false);
  };

  const openEditDoctorModal = (doctor) => {
    setEditModalDoctor(doctor);
     setEditDoctorModalOpen(true);
  };

  const closeDeleteDoctorModal = () => {
    setDeleteDoctorModalOpen(false);
  };

  const openDeleteDoctorModal = (doctor) => {
    setDeleteModalDoctor(doctor);
    setDeleteDoctorModalOpen(true);
  };

  const filteredDoctor = doctors.filter((doctor) => {
    return doctor && doctor.name && doctor.name.includes(searchDoctor);
  });

  return (
    <div className="flex w-full gap-5">
      <div className="h-full w-1/3 rounded-xl border border-grey p-3">
        <p className="text-lg font-semibold capitalize text-blue">
          add new doctor
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            specialization: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            specialization: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setAddDoctorMessage(null);
            addDoctor(values.name, values.email, values.specialization);
            setSubmitting(false);
            resetForm({});
          }}
        >
          <Form className="mt-3 flex w-full flex-col">
            <TextInput
              label="name of the doctor"
              name="name"
              type="text"
              placeholder="Dr.Jhone"
            />

            <TextInput
              label="email"
              name="email"
              type="email"
              placeholder="jhone@gmail.com"
            />

            <TextInput
              label="specialization"
              name="specialization"
              type="text"
              placeholder="Endocrinologist"
            />

            <div className="flex">
              <button
                className="w-full rounded-xl border-none bg-teal p-3 outline-none"
                type="submit"
              >
                <p className="font-semibold uppercase text-white">add</p>
              </button>
            </div>

            {addDoctorMessage && (
              <div className="mt-3 rounded-lg border border-red p-3 text-center">
                <p className="text-red">{addDoctorMessage}</p>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      <div className="flex w-full flex-col items-end">
        <div className="mb-5 flex gap-2">
          <input
            className="rounded-lg border border-grey p-2 outline-none"
            onChange={(e) => setSearchDoctor(e.target.value)}
            value={searchDoctor}
          />
          <div className="w-max rounded-lg bg-teal p-2">
            <SearchIcon className="text-white" />
          </div>
        </div>
        <div className="flex max-h-96 w-full flex-col gap-3 overflow-y-auto">
          {doctors &&
            filteredDoctor.map((doctor) => (
              <div className="flex w-full flex-col rounded-xl bg-lightGrey p-3">
                <div className="mb-2 flex w-full items-center justify-between">
                  <p className="font-semibold capitalize">{doctor.name}</p>
                  <div className="flex gap-5">
                    <button
                      className="flex items-center gap-1 rounded-lg border border-blue px-3 py-1 text-blue outline-none"
                      onClick={() => openEditDoctorModal(doctor)}
                    >
                      <EditIcon fontSize="small" />
                      <p className="text-sm font-semibold uppercase">edit</p>
                    </button>
                    <button
                      className="flex items-center gap-1 rounded-lg border border-red px-3 py-1 text-red outline-none"
                      onClick={() => openDeleteDoctorModal(doctor)}
                    >
                      <DeleteIcon fontSize="small" />
                      <p className="text-sm font-semibold uppercase">delete</p>
                    </button>
                  </div>
                </div>
                <p className="text-sm capitalize">{doctor.email}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-grey px-3 py-1">
                    <p className="text-sm font-semibold">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {editModalDoctor && (
            <EditDoctorModal
              isModalOpen={editDoctorModalOpen}
              modalClose={closeEditDoctorModal}
              doctor={editModalDoctor}
              setDoctor={setDoctor}
            />
          )}
          {deleteModalDoctor && (
            <DeleteDoctorModal
              isModalOpen={deleteDoctorModalOpen}
              modalClose={closeDeleteDoctorModal}
              doctor={deleteModalDoctor}
              setDoctor={setDoctor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
