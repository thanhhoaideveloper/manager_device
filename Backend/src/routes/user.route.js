const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get("", isAuth, isPermission("ADMIN"), UserController.getAll);
router.post("", isAuth, isPermission("ADMIN"), UserController.create);
router.get("/:id", isAuth, isPermission("ADMIN"), UserController.getOne);
router.get(
  "/permission/:id",
  isAuth,
  isPermission("ADMIN"),
  UserController.getOneUserHasPermission
);
router.put("/:id", isAuth, isPermission("ADMIN"), UserController.update);
router.delete("/:id", isAuth, isPermission("ADMIN"), UserController.deleted);
router.post('/change-permission',  isAuth, isPermission("ADMIN"), UserController.changeRole)

module.exports = router;
