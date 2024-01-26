const mongoose = require("mongoose");

const Doctor = require("../models/doctor.model");

exports.addDoctor = async (req, res) => {
  var { email, name, specialization } = req.body;

  var newDoctor = {
    name: name.toLowerCase(),
    email: email,
    specialization: specialization,
  };

  try {
    await Doctor.create(newDoctor)
      .then(async (result) => {
        const newDoctor = await Doctor.findById(result._id);
        res.status(200).json({ result: newDoctor });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Doctor.findByIdAndDelete(id)
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

exports.getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Doctor.findById(id)
      //.populate("symptoms")
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

exports.getAllDoctors = async (req, res) => {
  try {
    await Doctor.find()
      //.populate({ path: "symptoms", select: "name" })
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

exports.updateDoctor = async (req, res) => {
  const id = req.params.id;
  var { name, email, specialization } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const updateDoctor = {
    name: name.toLowerCase(),
    email: email,
    specialization: specialization,
  };

  try {
    await Doctor.findByIdAndUpdate(id, updateDoctor, { new: true })
      //.populate("symptoms")
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
