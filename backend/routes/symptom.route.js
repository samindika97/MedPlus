const express = require("express");
const router = express.Router();

const { authenticateJWT, checkPermission } = require("../middleware/userAuth");

const userRoles = require("../utils/userRoles");

const {
  symptomSearch,
  addSymptom,
  getSymptoms,
  getSymptom,
  updateSymptom,
  deleteSymptom,
  associatedDiseases,
} = require("../controllers/symptom.controller");

router.use(authenticateJWT);

router.get(
  "/search",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  symptomSearch
);

router.post(
  "/",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR])],
  addSymptom
);

router.get(
  "/",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  getSymptoms
);

router.get(
  "/:id",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  getSymptom
);

router.patch(
  "/:id",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR])],
  updateSymptom
);

router.delete(
  "/:id",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR])],
  deleteSymptom
);

router.get(
  "/associatedDiseases/:id",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  associatedDiseases
);

module.exports = router;
