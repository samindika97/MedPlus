const mongoose = require("mongoose");
const Hospital = require("../models/hospitalData.model");

exports.addHospital = async (req, res) => {
  console.log(req.body);
  try {
    const hospital = await Hospital.create(req.body);
    res.status(200).json(hospital);
    console.log("Succesfully added new hospital");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getHospital = async (req, res) => {
  try {
    await Hospital.find()
      .sort({ _id: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAHospital = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const hospital = await Hospital.findById(id)
      .then((result) => {
        res.send(result !=null ? result : { error: "Hospital not found" });
      })
      .catch((error) => {
        res.status(400).json({ error : "Hospital can not found"});
      });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteHospital = async (req, res) => { //not working if delted id if get 2nd time
  const id = req.params.id;
  console.log(id);
  try {
    const deleteHospital = await Hospital.findByIdAndDelete(id);
    res.send(deleteHospital);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateHospital = async (req, res) => {
  const id = req.params.id;
  try {
    const updateClinic = await Hospital.findByIdAndUpdate(id, req.body, { //not working if delted id if get 2nd time
      new: true,
    });
    res.send(updateClinic);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
