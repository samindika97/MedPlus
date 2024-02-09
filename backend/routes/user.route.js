const express = require("express");
const router = express.Router();

const {getUsersForSidebar} = require("../controllers/user.controller");

router.get("/", getUsersForSidebar);

module.exports = router;