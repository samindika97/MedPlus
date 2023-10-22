const mongoose = require("mongoose");

const Schema = mongoose.Schema ;

const messageSchema = new Schema({
    name :{type:String},
    email : {type:String},
    message : {type:String},
},{
    timestamps:true,
});

module.exports = mongoose.model("contact_message_data",messageSchema);