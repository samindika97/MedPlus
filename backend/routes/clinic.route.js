const express = require("express");
const router = express.Router();

const {addClinic,getClinic,deleteClinic, updateClinic, searchClinicByHopital} = require("../controllers/clinic.contoller");

router.post('/',addClinic);

router.get('/',getClinic);

router.get('/search',searchClinicByHopital);

router.delete('/:id',deleteClinic);

router.put('/:id',updateClinic);

module.exports = router;