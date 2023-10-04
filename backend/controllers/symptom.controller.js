const mongoose = require("mongoose");

const Symptom = require("../models/symptom.model");
const Disease = require("../models/disease.model");

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
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSymptoms = async (req, res) => {
  try {
    await Symptom.find()
      .sort({ _id: -1 })
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

exports.getSymptom = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Symptom.findById(id)
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

exports.updateSymptom = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Symptom.findByIdAndUpdate(
      id,
      { name: name.toLowerCase() },
      { new: true }
    )
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

exports.deleteSymptom = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
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
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.associatedDiseases = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Disease.find({ symptoms: id })
      .select("name")
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
