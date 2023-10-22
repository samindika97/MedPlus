const express = require("express");
const router = express.Router();

const {addMessage,getMessages} = require("../controllers/contactus.controller");

router.post('/', addMessage);
router.get('/', getMessages);

module.exports = router;