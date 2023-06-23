const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/device.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "/get-list",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceController.getAll
);
router.patch(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceController.getOne
);
router.post(
  "",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceController.create
);
router.put(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DEVICE_MANAGEMENT"),
  deviceController.deleted
);

module.exports = router;