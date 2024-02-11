const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/userAuth");

const {getDoctorsForSidebar,getUserRole,getUsersForSidebar} = require("../controllers/user.controller");

router.get("/getDoctors", getDoctorsForSidebar);

router.get("/getUsers", getUsersForSidebar);

router.get("/getRole",authenticateJWT, getUserRole);

module.exports = router;