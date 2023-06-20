const express = require("express");
const router = express.Router();

const requestDeviceController = require("../controllers/requestDevice.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  requestDeviceController.create
);
router.post(
  "",
  isAuth,
  requestDeviceController.create
);
router.get(
  "/:id",
  isAuth,
  requestDeviceController.getOne
);
router.put(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  requestDeviceController.updateStatus
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  requestDeviceController.create
);

module.exports = router;
