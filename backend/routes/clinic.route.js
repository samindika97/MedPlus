const express = require("express");
const router = express.Router();

const {addClinic,getClinic} = require("../controllers/clinic.contoller");

router.post('/',addClinic);

router.get('/',getClinic);

module.exports = router;