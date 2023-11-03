const mongoose = require("mongoose");

const Doctor = require("../models/doctor.model");

exports.addDoctor = async (req, res) => {
    const { email, name, specialization } = req.body;


  try {
    let existingDoctor = null;

    existingDoctor = await Doctor.findOne({ email: email });

    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor already exists" });
    }

    const newDoctor = new Doctor({
      name,
      email,
      specialization,
    });
    await newDoctor.save();

    res
      .status(200)
      .json({ success: true, message: "Doctor successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server side error, try again" });
  }
};

{/*exports.addDoctor = async (req, res) => {
  var { email, name, specialization } = req.body;

  var newDisease = {
    name: name.toLowerCase(),
    email: email,
    specialization: specialization,
  };

  try {
    await Doctor.create(newDoctor)
      .then(async (result) => {
        const newDoctor = await Doctor.findById(result._id).populate({
          path: "symptoms",
          select: "name",
        });
        res.status(200).json({ result: newDisease });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};*/}

{/*exports.deleteDoctor = async(req, res)=> {
  const id = req.params.id

  try {
      
      await Doctor.findByIdAndDelete(id,);

      res 
          .status(200)
          .json({
              status: true,
              message:"Successfully deleted",
          });
  } catch (err) {
      res.status(500).json({success: false, message:"Failed to delete"});
  }
};*/}

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

{/*exports.getSingleDoctor = async(req, res)=> {
  const id = req.params.id;

  try {
      
      const doctor = await Doctor.findById(id);

      res 
          .status(200)
          .json({
              status: true,
              message:"Doctor fond",
              data: doctor,
          });
  } catch (err) {
      res.status(404).json({success: false, message:"No doctor found"});
  }
};*/}

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


{/*exports.getAllDoctors = async(req, res)=> {

  try {
      
      const doctor = await Doctor.find({});

      res 
          .status(200)
          .json({
              status: true,
              message:"Doctors found",
              data: doctor,
          });
  } catch (err) {
      res.status(404).json({success: false, message:"No doctors found"});
  }
};*/}

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

{/*exports.updateDoctor = async(req, res)=> {
  const id = req.params.id

  try {
      
      const updateDoctor = await Doctor.findByIdAndUpdate(id, {$set: req.body}, {new:true});

      res 
          .status(200)
          .json({
              status: true,
              message:"Successfully updated",
              data: updateDoctor,
          });
  } catch (err) {
      res.status(500).json({success: false, message:"Failed to update"});
  }
};*/}

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
