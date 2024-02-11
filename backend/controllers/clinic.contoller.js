const mongoose = require("mongoose");

const Clinic = require("../models/clinicData.model");

exports.addClinic = async (req, res) => {
  console.log(req.body);
  try {
    const clinic = await Clinic.create(req.body);
    res.status(200).json(clinic);
    console.log("Succsfully added new clinic");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getClinic = async (req, res) => {
  try {
    await Clinic.find()
      .sort({ _id: -1 })
      .populate("hospital")
      .then((result) => {
        // res.status(200).json({ result });
        res.send(result);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.searchClinicByHopital = async (req, res) => {
  const hospital_id = req.query.hospital;
  //console.log(hospital_id);
  try {
    await Clinic.find({ hospital: hospital_id })
      .sort({ _id: -1 })
      .populate("hospital")
      .then((result) => {
        // res.status(200).json({ result });
        res.send(result);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteClinic = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleteClinic = await Clinic.findByIdAndDelete(id);
    res.send(deleteClinic);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateClinic = async (req, res) => {
  const id = req.params.id;
  try {
    const updateClinic = await Clinic.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updateClinic);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
