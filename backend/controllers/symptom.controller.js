const Symptom = require("../models/symptom.model");

exports.addSymptom = async (req, res) => {
  var { name } = req.body;

  name = name.toLowercase();

  await Symptom.create({ name })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getSymptoms = async (req, res) => {
  await Symptom.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getSymptom = async (req, res) => {
  const id = req.params.id;

  await Symptom.findById(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateSymptom = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  await Symptom.findByIdAndUpdate(id, { name: name }, { new: true })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSymptom = async (req, res) => {
  const id = req.params.id;

  await Symptom.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
