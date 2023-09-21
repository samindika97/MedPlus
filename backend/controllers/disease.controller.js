const mongoose = require("mongoose");

const Disease = require("../models/disease.model");

exports.addDisease = async (req, res) => {
  var { name, content, symptoms } = req.body;

  var newDisease = {
    name: name.toLowerCase(),
    content: content,
    symptoms: symptoms,
  };

  try {
    await Disease.create(newDisease)
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

exports.getDiseases = async (req, res) => {
  try {
    await Disease.find()
      .populate({ path: "symptoms", select: "name" })
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

exports.getDisease = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Disease.findById(id)
      .populate("symptoms")
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateDisease = async (req, res) => {
  const id = req.params.id;
  var { name, content, symptoms } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const updateDisease = {
    name: name.toLowerCase(),
    content: content,
    symptoms: symptoms,
  };

  try {
    await Disease.findByIdAndUpdate(id, updateDisease, { new: true })
      .populate("symptoms")
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteDisease = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Disease.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
