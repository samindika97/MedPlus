const GuidlineModel = require("../models/guidline.model")

exports.getGuideline = async (req, res) => {
    const { id } = req.params;     
    try {
        const guideline = await GuidlineModel.findById(id);
        
        if (!guideline) {
            return res.status(404).json({ error: "Guideline not found" });
        }
        
        res.status(200).json(guideline);
        console.log("Successfully retrieved guideline");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getReportTypes = async(req,res)=>{
    try {
        const reportTypes = await GuidlineModel.find().distinct('type');
       // console.log(reportTypes);
        if (!reportTypes) {
            return res.status(404).json({ error: "Guideline not found" });
        }
        res.status(200).json(reportTypes);
        console.log("Successfully retrieved guideline");

    } catch (error) {
        
    }
};

exports.getAllGuideline = async (req, res) => {
   
    try {
        const guideline = await GuidlineModel.find().sort({ _id: -1 });
        
        if (!guideline) {
            return res.status(404).json({ error: "Guideline not found" });
        }
        
        res.status(200).json(guideline);
        console.log("Successfully retrieved guideline");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.addGuidline = async(req,res)=>{
    try {
        const guidline = await GuidlineModel.create(req.body);
        res.status(200).json(guidline);
        console.log("Succsfully added new guidline");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

exports.updateGuideline = async (req, res) => {
    const { id } = req.params;     
    try {
        const updatedGuideline = await GuidlineModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedGuideline) {
            return res.status(404).json({ error: "Guideline not found" });
        }
        
        res.status(200).json(updatedGuideline);
        console.log("Successfully updated guideline");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteGuideline = async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedGuideline = await GuidlineModel.findByIdAndRemove(id);
        
        if (!deletedGuideline) {
            return res.status(404).json({ error: "Guideline not found" });
        }
        
        res.status(200).json(deletedGuideline);
        console.log("Successfully deleted guideline");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};
