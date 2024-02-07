const mongoose = require("mongoose");

const conservationShema = new mongoose.Schema({
    participants :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],

    message:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[],
        }
    ]
},{timestamps: true});

module.exports = mongoose.model("Conversation", conservationShema);