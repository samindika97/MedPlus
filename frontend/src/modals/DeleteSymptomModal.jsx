import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useDeleteSymptomMutation } from "../services/symptomsService";

const DeleteSymptomModal = ({ isModalOpen, modalClose, symptom }) => {
  const [deleteSymptom, { error, isLoading }] = useDeleteSymptomMutation();

  const handleDeleteSymptom = async () => {
    const res = await deleteSymptom({ id: symptom._id });

    if (res?.data?.status) {
      toast.success(res?.data?.message);
      modalClose();
    }
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
                  <p className="text-justify text-sm text-blue">
                    Are you sure want to delete symptom : "{symptom.name}" from
                    the system?
                  </p>
                  <p className="mt-3 text-justify text-xs italic text-blue">
                    Once deleted, it will be removed from all diseases that it
                    has been added
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-transparent bg-red px-4 py-2 text-sm font-medium text-white"
                    onClick={handleDeleteSymptom}
                  >
                    {!isLoading ? (
                      <p className="capitalize">delete</p>
                    ) : (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-grey border-t-white" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-grey px-4 py-2 text-sm font-medium text-white"
                    onClick={modalClose}
                  >
                    <p className="capitalize">cancel</p>
                  </button>
                </div>
                {error && (
                  <div className="mt-3 rounded-lg border border-red p-3">
                    <p className="text-red">{error}</p>
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
