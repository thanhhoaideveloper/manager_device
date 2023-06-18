const express = require("express");
const router = express.Router();

const deviceDamagedController = require("../controllers/deviceDamaged.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceDamagedController.getAll
);
router.post(
  "",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceDamagedController.create
);
router.get(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceDamagedController.getOne
);
router.put(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceDamagedController.updateStatus
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceDamagedController.remove
);

module.exports = router;
