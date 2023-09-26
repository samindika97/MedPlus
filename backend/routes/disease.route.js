const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/userAuth");

const {
  addDisease,
  getDiseases,
  getDisease,
  updateDisease,
  deleteDisease,
} = require("../controllers/disease.controller");

router.use(authenticateJWT);

router.post("/", addDisease);

router.get("/", getDiseases);

router.get("/:id", getDisease);

router.patch("/:id", updateDisease);

router.delete("/:id", deleteDisease);

module.exports = router;
