const PermissionService = require("../services/permission.service");
const UserService = require("../services/user.service");
const UserPermissionService = require("../services/userPermission.service");

const { filterInArray, filterOutArray } = require("../utils/helper.util");

async function getAllPermission(req,res,next) {
	const listPermission = await PermissionService.findAll();

	return res.status(200).send(listPermission);
}

async function addPermission(req, res, next) {
	const formData = req.body;
	const { userId, listPermissionId } = formData;
	const checkUserExist = UserService.findOne({ id: userId });
	if (!checkUserExist) return res.status(401).send({ message: "Not found User" });
	for (const permissionId of listPermissionId) {
		let checkPermission = PermissionService.findOne({ id: permissionId });
		if (checkPermission) {
			await UserPermissionService.create(userId, permissionId);
		}
	}

	const result = await UserService.listPermission(userId);
	return res.status(202).send(result);
}
async function deletePermission(req, res, next) {
	const formData = req.body;
  const { userId, listPermissionId } = formData;
  const checkUserExist = UserService.findOne({ id: userId });
  if (!checkUserExist)
    return res.status(401).send({ message: "Not found User" });
  for (const permissionId of listPermissionId) {
    let checkPermission = PermissionService.findOne({ id: permissionId });
    if (checkPermission) {
      await UserPermissionService.delete(userId, permissionId);
    }
  }

  const result = await UserService.listPermission(userId);
  return res.status(202).send(result);
}

async function updatePermission(req, res, next) {
	const formData = req.body;
	const { userId, listPermissionId } = formData;

	const checkUserExist = await UserService.listPermission(userId);
  if (!checkUserExist)
		return res.status(401).send({ message: "Not found User" });

	const listPermissionOld = await checkUserExist.Permissions.map(
    (value, index, arr) => value.id
  );
	const listPermissionIdDuplicate = await filterInArray(
    listPermissionOld, listPermissionId
  );
	const listPermissionIdDelete = await filterOutArray(listPermissionOld, listPermissionIdDuplicate);
	const listPermissionIdCreate = await filterOutArray(listPermissionId, listPermissionIdDuplicate);

	const result = await UserPermissionService.update(userId, listPermissionIdDelete, listPermissionIdCreate);

	if (!result) res.status(400).send({ message: "Cập nhật thất bại" });

	const user = await UserService.listPermission(userId);
	return res.status(200).send(user);
}
module.exports = {
	getAllPermission,
	addPermission,
	deletePermission,
	updatePermission
}