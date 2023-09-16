import React, { useState, useEffect, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ExpandIcon, SearchIcon } from "../icons/icon";

import FeaturesTitle from "../components/FeaturesTitle";

const symptoms = [
  { id: 1, name: "fever" },
  { id: 2, name: "cough" },
  { id: 3, name: "headache" },
  { id: 4, name: "sore throat" },
  { id: 5, name: "fatigue" },
  { id: 6, name: "nausea" },
  { id: 7, name: "shortness of breath" },
  { id: 8, name: "muscle aches" },
  { id: 9, name: "runny nose" },
  { id: 10, name: "diarrhea" },
  { id: 11, name: "chills" },
  { id: 12, name: "vomiting" },
  { id: 13, name: "abdominal pain" },
  { id: 14, name: "chest pain" },
  { id: 15, name: "joint pain" },
];

const diseases = [
  {
    id: 1,
    name: "influenza",
    content:
      "Influenza, commonly referred to as the flu, is a highly contagious respiratory illness caused by influenza viruses. It primarily affects the nose, throat, and sometimes the lungs. The flu is characterized by ...",
  },
  {
    id: 2,
    name: "pneumonia",
    content:
      "Pneumonia is a common and potentially serious respiratory infection that primarily affects the lungs. It can be caused by various microorganisms such as bacteria, viruses, fungi, or other germs. Pneumonia occurs when the air...",
  },
];

const SymptomChecker = () => {
  const [selectedSymptom, setSelectedSymptom] = useState([]);
  const [query, setQuery] = useState("");

  const filteredSymptoms =
    query === ""
      ? symptoms
      : symptoms.filter((symptom) =>
          symptom.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="w-full">
      <FeaturesTitle title="symptom checker" />
      <div className="w-full rounded-xl bg-lightGrey p-3">
        <Combobox
          value={selectedSymptom}
          onChange={setSelectedSymptom}
          multiple
        >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-mintGreen sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-blue outline-none focus:ring-0"
                displayValue={(symptom) => symptom.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ExpandIcon className="h-5 w-5 text-blue" aria-hidden="true" />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredSymptoms.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-grey">
                    No matching symptom found
                  </div>
                ) : (
                  filteredSymptoms.map((symptom) => (
                    <Combobox.Option
                      key={symptom.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-mintGreen text-white" : "text-blue"
                        }`
                      }
                      value={symptom}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {symptom.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-mintGreen"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        {selectedSymptom.length > 0 && (
          <div className="mt-3 flex gap-3">
            {selectedSymptom.map((symptom) => (
              <div
                key={symptom.id}
                className="rounded-xl bg-mintGreen px-4 py-2 text-sm font-semibold capitalize text-blue"
              >
                {symptom.name}
              </div>
            ))}
          </div>
        )}
        <button className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-teal py-2">
          <span className="text-white">
            <SearchIcon />
          </span>
          <p className="font-semibold uppercase text-white">search</p>
        </button>
      </div>
      <p className="my-3 font-semibold">Search Results...</p>
      <div className="flex flex-col gap-3">
        {diseases.map((disease) => (
          <div className="rounded-xl bg-mintGreen p-3" id={disease.id}>
            <p className="mb-2 text-lg font-semibold capitalize text-blue">
              {disease.name}
            </p>
            <p className="text-blue ">{disease.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomChecker;
