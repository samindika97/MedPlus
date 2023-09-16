const express = require("express");
const router = express.Router();

const { addSymptom } = require("../controllers/symptom.controller");

router.post("/add-symptom", addSymptom);

module.exports = router;
