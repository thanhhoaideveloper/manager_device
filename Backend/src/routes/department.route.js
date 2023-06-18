const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department.controller')
const departmentDeviceController = require('../controllers/departmentDevice.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.getAll
);
router.patch(
  "/:id",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.getOne
);
router.post(
  "",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.create
);
router.put(
  "/:id",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.deleted
);

//device in department
router.get(
  "/:id/get-device",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentController.getAllDevice
);
router.post(
  "/add-device",
  isAuth,
  isPermission("DEPARTMENT_MANAGEMENT"),
  departmentDeviceController.create
);
router.post(
  "/remove-device",
  isAuth,
  isPermission("REMOVE_DEVICE_TO_DEPARTMENT"),
  departmentDeviceController.remove
);

module.exports = router;