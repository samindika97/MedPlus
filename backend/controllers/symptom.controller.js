const mongoose = require("mongoose");

const Symptom = require("../models/symptom.model");
const Disease = require("../models/disease.model");

const responseHandler = require("../utils/response");

exports.symptomSearch = async (req, res) => {
  const { symptomArray } = req.query;

  if (!symptomArray) {
    return res.status(400).json({ error: "symptomArray parameter is missing" });
  }

  const isArray = Array.isArray(symptomArray);

  const symptomArr = isArray ? symptomArray : [symptomArray];

  const symptomIdArray = symptomArr.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  try {
    await Disease.aggregate([
      {
        $addFields: {
          matchingSymptoms: {
            $size: {
              $setIntersection: ["$symptoms", symptomIdArray],
            },
          },
        },
      },
      {
        $sort: { matchingSymptoms: -1 },
      },
      {
        $match: { matchingSymptoms: { $gt: 0 } },
      },
    ])
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addSymptom = async (req, res) => {
  var { name } = req.body;

  name = name.toLowerCase();

  try {
    await Symptom.create({ name })
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Symptom added Successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

exports.getSymptoms = async (req, res) => {
  try {
    await Symptom.find()
      .sort({ _id: -1 })
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Symptoms fetched successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

exports.getSymptom = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid symptom ID");
  }

  try {
    await Symptom.findById(id)
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Symptom fetched successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

exports.updateSymptom = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid symptom ID");
  }

  try {
    await Symptom.findByIdAndUpdate(
      id,
      { name: name.toLowerCase() },
      { new: true }
    )
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Symptom updated Successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

exports.deleteSymptom = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid symptom ID");
  }

  try {
    await Symptom.findByIdAndDelete(id)
      .then(async (result) => {
        var includedDiseases = await Disease.find({ symptoms: id });
        includedDiseases &&
          includedDiseases.map(async (disease) => {
            var newSymptoms = disease.symptoms.filter(
              (item) => item._id !== id
            );
            await Disease.findByIdAndUpdate(disease._id, {
              symptoms: newSymptoms,
            });
          });
        return responseHandler.success(
          res,
          result,
          "Symptom deleted Successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};

exports.associatedDiseases = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid symptom ID");
  }

  try {
    await Disease.find({ symptoms: id })
      .select("name")
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Associated diseases retrieved Successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.error(res, error);
  }
};
