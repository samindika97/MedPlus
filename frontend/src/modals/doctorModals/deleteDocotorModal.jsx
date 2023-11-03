import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";

const DeleteDoctorModal = ({
  isModalOpen,
  modalClose,
  doctor,
  setDoctor,
}) => {
  const [deleteDoctorMessage, setDeleteDoctorMessage] = useState(null);

  useEffect(() => {
    setDeleteDoctorMessage(null);
  }, []);

  const deleteDoctor = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "delete",
      url: `${BASE_URL}doctor/${doctor._id}`,
    };
    axios(axiosConfig)
      .then((response) => {
        setDoctor((prev) =>
          prev.filter((item) => item._id !== response.data.result._id),
        );
        modalClose();
      })
      .catch((err) => {
        setDeleteDoctorMessage(err.response.data.error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-blue"
                >
                  Alert !
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-blue">
                    Are you sure want to delete doctor : "{doctor.name}" from
                    the system?
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red px-4 py-2 text-sm font-medium text-white"
                    onClick={deleteDoctor}
                  >
                    <p className="capitalize">delete</p>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-grey px-4 py-2 text-sm font-medium text-white"
                    onClick={modalClose}
                  >
                    <p className="capitalize">cancel</p>
                  </button>
                </div>
                {deleteDoctorMessage && (
                  <div className="mt-3 rounded-lg border border-red p-3">
                    <p className="text-red">{deleteDoctorMessage}</p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteDoctorModal;
