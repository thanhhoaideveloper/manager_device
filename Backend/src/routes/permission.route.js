const express = require("express");
const router = express.Router();

const PermissionController = require("../controllers/permission.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get('/', isAuth, isPermission("GET_LIST_PERMISSION"), PermissionController.getAllPermission);
router.post(
  "/",
  isAuth,
  isPermission("ADD_PERMISSION"),
  PermissionController.addPermission
);
router.delete(
  "/",
  isAuth,
  isPermission("DELETE_PERMISSION"),
  PermissionController.addPermission
);
router.put('', isAuth, isPermission("UPDATE_PERMISSION"), PermissionController.updatePermission);


module.exports = router;

