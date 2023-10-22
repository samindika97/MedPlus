const mongoose = require("mongoose");
const Hospital = require("../models/hospitalData.model");

exports.addHospital = async(req,res)=>{
    console.log(req.body);
    try{
        const hospital = await Hospital.create(req.body);
        res.status(200).json(hospital);
        console.log("Succesfully added new hospital");
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Server error"});
    }
};

exports.getHospital = async(req,res)=>{
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