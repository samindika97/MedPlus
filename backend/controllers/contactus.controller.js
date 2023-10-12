const Message_data = require("../models/message.model"); 

const  addMessage = async(req,res,next)=>{
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

module.exports = addMessage;
