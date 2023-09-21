const express = require("express");
const router = express.Router();

const {
  addSymptom,
  getSymptoms,
  getSymptom,
  updateSymptom,
  deleteSymptom,
} = require("../controllers/symptom.controller");

router.post("/", addSymptom);

router.get("/", getSymptoms);

router.get("/:id", getSymptom);

router.patch("/:id", updateSymptom);

router.delete("/:id", deleteSymptom);

module.exports = router;
