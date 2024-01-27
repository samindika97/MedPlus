const Message_data = require("../models/message.model"); 

exports.addMessage = async(req,res,next)=>{
    try{
      const message_data = await Message_data.create(req.body);
      res.status(200).json(message_data);
      console.log("Succsfully added new message");
    }
    catch(error){
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
};


exports.getMessages = async(req,res,next)=>{
  const messages = await Message_data.find().sort({createdAt:-1});
  res.send(messages);
};