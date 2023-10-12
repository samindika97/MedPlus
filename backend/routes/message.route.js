const express = require("express");
const router = express.Router();

const addMessage = require("../controllers/contactus.controller");

router.post('/', addMessage);

module.exports = router;