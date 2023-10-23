const mongoose = require("mongoose");

const Clinic = require("../models/clinicData.model");

exports.addClinic = async(req,res)=>{
    console.log(req.body);
    try{
        const clinic = await Clinic.create(req.body);
        res.status(200).json(clinic);
        console.log("Succsfully added new clinic");
    }
    catch(error){
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
};

exports.getClinic = async(req,res)=>{
    try {
        await Clinic.find()
          .sort({ _id: -1 }).populate("hospital")
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

exports.deleteClinic = async(req,res)=>{
  try{
    const id = req.params.id
  }
  catch{

  }
};