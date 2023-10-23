const express = require("express");
const router = express.Router();

const {addClinic,getClinic,deleteClinic} = require("../controllers/clinic.contoller");

router.post('/',addClinic);

router.get('/',getClinic);

router.get('/delete',deleteClinic);

module.exports = router;