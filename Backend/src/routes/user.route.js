const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const { isPermission } = require("../middlewares/access.middleware");

router.get("", isAuth, isPermission("GET_LIST_USER"), UserController.getAll);
router.post("", isAuth, isPermission("ADD_USER"), UserController.create);
router.get(
  "/:id",
  isAuth,
  isPermission("GET_ONE_USER"),
  UserController.getOne
);
router.get(
  "/permission/:id",
  isAuth,
  // isPermission("GET_ONE_USER_HAS_PERMISSION"),
  UserController.getOneUserHasPermission
);
router.put(
  "/:id",
  isAuth,
  isPermission("UPDATE_USER"),
  UserController.update
);
router.delete(
  "/:id",
  isAuth,
  isPermission("DELETE_USER"),
  UserController.deleted
);

module.exports = router;
