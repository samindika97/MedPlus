const express = require("express");
const router = express.Router();

const { authenticateJWT, checkPermission } = require("../middleware/userAuth");

const userRoles = require("../utils/userRoles");

const {
  addDisease,
  getDiseases,
  getDisease,
  updateDisease,
  deleteDisease,
} = require("../controllers/disease.controller");

router.use(authenticateJWT);

router.post(
  "/",
  [checkPermission([userRoles.ADMIN])],
  addDisease
);

router.get(
  "/",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  getDiseases
);

router.get(
  "/:id",
  [checkPermission([userRoles.ADMIN, userRoles.DOCTOR, userRoles.USER])],
  getDisease
);

router.patch(
  "/:id",
  [checkPermission([userRoles.ADMIN])],
  updateDisease
);

router.delete(
  "/:id",
  [checkPermission([userRoles.ADMIN])],
  deleteDisease
);

module.exports = router;
