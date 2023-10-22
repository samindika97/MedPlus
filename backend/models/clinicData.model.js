const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    day:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    hospital:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Hospital",
        required:true,
    },
    doctors:[String],
    additional_dsc:String,
});

module.exports = mongoose.model("Clinic_data",clinicSchema);