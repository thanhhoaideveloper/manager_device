const express = require("express");
const router = express.Router();

const PermissionController = require("../controllers/permission.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get(
  "/",
  isAuth,
  isPermission("ADMIN"),
  PermissionController.getAllPermission
);
router.post(
  "/",
  isAuth,
  isPermission("ADMIN"),
  PermissionController.addPermission
);
router.delete(
  "/",
  isAuth,
  isPermission("ADMIN"),
  PermissionController.addPermission
);
router.put(
  "",
  isAuth,
  isPermission("ADMIN"),
  PermissionController.updatePermission
);


module.exports = router;

