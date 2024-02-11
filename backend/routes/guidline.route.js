const express = require("express");
const router = express.Router();

const {
  addGuidline,
  getAllGuideline,
  updateGuideline,
  getGuideline,
  deleteGuideline,
  getReportTypes,
} = require("../controllers/labreport.controller");

const conditionDetermine = require("../controllers/conditionDetermine");

router.post("/condition", conditionDetermine);

// router.get("/ReportTypes", getReportTypes);

router.post("/", addGuidline);

router.get("/", getAllGuideline);

router.get("/:id", getGuideline);

router.put("/:id", updateGuideline);

router.delete("/:id", deleteGuideline);

module.exports = router;
