const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getSingleDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor.controller");

router.post("/", addDoctor);

router.get("/", getAllDoctors);

router.get("/:id", getSingleDoctor);

router.put("/:id", updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
