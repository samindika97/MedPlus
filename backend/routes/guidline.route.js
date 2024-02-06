const express = require("express");
const { addGuidline, getAllGuideline, updateGuideline, getGuideline, deleteGuideline } = require("../controllers/labreport.controller");
const conditionDetermine = require("../controllers/conditionDetermine");

const router = express.Router();


router.post('/condition',conditionDetermine);

router.post('/',addGuidline);

router.get('/',getAllGuideline);

router.get('/:id',getGuideline);

router.put('/:id',updateGuideline);

router.delete('/:id',deleteGuideline);

module.exports = router;