const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department.controller')
const departmentDeviceController = require('../controllers/departmentDevice.controller');
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "",
  isAuth,
  isPermission("GET_LIST_DEPARTMENT"),
  departmentController.getAll
);
router.patch(
  "/:id",
  isAuth,
  isPermission("GET_ONE_DEPARTMENT"),
  departmentController.getOne
);
router.post(
  "",
  isAuth,
  isPermission("ADD_DEPARTMENT"),
  departmentController.create
);
router.put(
  "/:id",
  isAuth,
  isPermission("UPDATE_DEPARTMENT"),
  departmentController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DELETE_DEPARTMENT"),
  departmentController.deleted
);

//device in department
router.get(
  "/:id/get-device",
  isAuth,
  isPermission("GET_LIST_DEVICE_DEPARTMENT"),
  departmentController.getAllDevice
);
router.post(
  "/add-device",
  isAuth,
  isPermission("ADD_DEVICE_TO_DEPARTMENT"),
  departmentDeviceController.create
);
router.post(
  "/remove-device",
  isAuth,
  isPermission("REMOVE_DEVICE_TO_DEPARTMENT"),
  departmentDeviceController.remove
);

module.exports = router;