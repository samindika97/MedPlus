const mongoose = require("mongoose");

const chatMessageShema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        requred: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        requred:true
    },

    message:{
        type: String,
        requred: true
    }
},{timestamps: true});

module.exports = mongoose.model("ChatMessage", chatMessageShema);