const express = require("express");
const router = express.Router() ;

const {addHospital,getHospital} = require("../controllers/hospital.controller");

router.post('/',addHospital);

router.get('/',getHospital);

module.exports = router ;