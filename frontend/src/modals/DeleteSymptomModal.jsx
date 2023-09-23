import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import BASE_URL from "../config/ApiConfig";

const DeleteSymptomModal = ({
  isModalOpen,
  modalClose,
  symptom,
  setSymptoms,
}) => {
  const [deleteSymptomMessage, setDeleteSymptomMessage] = useState(null);

  useEffect(() => {
    setDeleteSymptomMessage(null);
  }, []);

  const deleteSymptom = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "delete",
      url: `${BASE_URL}symptoms/${symptom._id}`,
    };
    axios(axiosConfig)
      .then((response) => {
        setSymptoms((prev) =>
          prev.filter((item) => item._id !== response.data.result._id),
        );
        modalClose();
      })
      .catch((err) => {
        setDeleteSymptomMessage(err.response.data.error);
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
                    Are you sure want to delete symptom : "{symptom.name}" from
                    the system?
                  </p>
                  <p className="mt-3 text-xs italic text-blue">
                    Once deleted, it will be removed from all diseases that it
                    has been added
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="bg-red inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white"
                    onClick={deleteSymptom}
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
                {deleteSymptomMessage && (
                  <div className="border-red mt-3 rounded-lg border p-3">
                    <p className="text-red">{deleteSymptomMessage}</p>
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

export default DeleteSymptomModal;
