const express = require("express");
const {sendMessage, getMessage} = require("../controllers/chatMessage.controller");
const {authenticateJWT} = require("../middleware/userAuth");


const router = express.Router();

router.post("/send/:id",authenticateJWT,sendMessage)
router.get("/:id", authenticateJWT,getMessage)


module.exports = router