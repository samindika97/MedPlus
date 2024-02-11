const express = require("express");
const router = express.Router();

const {
  addHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  getAHospital,
} = require("../controllers/hospital.controller");

router.post("/", addHospital);

router.get("/:id", getAHospital);

router.get("/", getHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
