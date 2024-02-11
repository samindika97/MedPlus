import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import FeaturesTitle from "../../components/FeaturesTitle";

import { SearchIcon } from "../../icons/icon";

import { useLazyGetDiseasesQuery } from "../../services/diseaseService";
import { urlSlug } from "../../utils/urlSlug";

const alphabet = [
  "all",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const DiseaseDirectory = () => {
  const [filterSelected, setFilterSelected] = useState(alphabet[0]);

  const navigate = useNavigate();

  const [
    fetchDiseases,
    {
      isSuccess: isSuccessDiseases,
      data: diseasesData,
      isError: isErrorDiseases,
      error: diseaseError,
      isFetching: isFetchingDiseases,
    },
  ] = useLazyGetDiseasesQuery();

  useEffect(() => {
    fetchDiseases({
      fixedCacheKey: "diseases",
    });
  }, [fetchDiseases]);

  const filteredDiseases =
    isSuccessDiseases &&
    diseasesData.data.filter((disease) => {
      return filterSelected === alphabet[0]
        ? disease
        : disease.name.startsWith(filterSelected);
    });

  return (
    <div className="w-full">
      <FeaturesTitle title="health directory" />
      <div className="mb-5 flex w-full items-center justify-between">
        {alphabet.map((letter) => {
          const isActive = letter === filterSelected;
          return (
            <div
              className={`flex h-7 w-7 cursor-pointer items-center justify-center  rounded-lg first:px-8 first:py-1 ${
                isActive ? "bg-mintGreen" : "bg-lightGrey"
              }`}
              key={letter}
              onClick={() => setFilterSelected(letter)}
            >
              <p className="text-lg font-semibold capitalize text-blue">
                {letter}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex h-full flex-col gap-2 overflow-y-auto">
        {isSuccessDiseases &&
          filteredDiseases.map((disease) => (
            <div
              className="flex w-full cursor-pointer flex-col rounded-xl bg-lightGrey p-3"
              key={disease._id}
              onClick={() =>
                navigate(`${urlSlug.FEATURE.HEALTH_DIRECTORY}/${disease._id}`)
              }
            >
              <p className="text-lg font-semibold capitalize">{disease.name}</p>
              <p className="">{disease.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DiseaseDirectory;
