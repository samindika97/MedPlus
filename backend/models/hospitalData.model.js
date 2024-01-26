const mongoose = require("mongoose");

const hospitalDataSchema = new mongoose.Schema({
    hospital_name:{
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
        required:true,
        unique:true,
    }
}
);
module.exports = mongoose.model("Hospital",hospitalDataSchema);