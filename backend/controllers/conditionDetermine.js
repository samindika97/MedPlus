const Guideline = require("../models/guidline.model");

const conditionDetermine = async (req, res, next) => {
  try {
    const reportType = req.body.type;
    const userValue = req.body.value;
    const guidlines = await Guideline.find({ type: reportType });

    if (!guidlines || guidlines.length === 0) {
      return res
        .status(404)
        .json({ error: "Guidelines not found for the specified type" });
    }

    const sortedGuidelines = guidlines.sort((a, b) => {
      return a.min_value - b.min_value;
    });

    for (const guideline of sortedGuidelines) {
      if (
        userValue >= guideline.min_value &&
        userValue <= guideline.max_value
      ) {
        res.status(200).json(guideline);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error : "Server error" });
  }
};

module.exports = conditionDetermine;
