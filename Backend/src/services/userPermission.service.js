const { UserPermission } = require("../models");
const UserService = require("../services/user.service");
const PermissionService = require("../services/permission.service");

exports.findOne = async (fields) => {
  return await UserPermission.findOne({ where: fields });
};
exports.findPermissionIdByUserId = async (userId) => {
	return await UserPermission.findAll({
		attribute: ['permission_id'],
		where: { user_id: userId }
	});
};
exports.findUserIdByPermissionId = async (permissionId) => {
	return await UserPermission.findAll({
    attribute: ["user_id"],
    where: { permission_id: permissionId },
  });
};
exports.create = async (userId, permissionId) => {
  try {
    const user = await UserService.findOne({ id: userId });
    if (!user) throw new Error("Not Found User");

    const permission = await PermissionService.findOne({ id: permissionId });
		if (!permission) throw new Error("Not found permission");

		const checkHasExist = await UserPermission.findOne({
			where: {
				user_id: userId,
				permission_id: permissionId
			}
		});
		if (checkHasExist) throw new Error("Permission of this user has exist");

		return await UserPermission.create({
			user_id: userId,
			permission_id: permissionId
		})
	} catch (err) {
		console.log(err);
		return null;
	}
};
exports.delete = async (userId, permissionId) => {
	const userPermission = await UserPermission.findOne({
		where: {
			user_id: userId,
			permission_id: permissionId
		}
	});
	return await userPermission.destroy();
}

exports.update = async (userId, listDelete, listCreate) => {
	try {
		await listDelete.forEach((permissionId) => this.delete(userId, permissionId));
		await listCreate.forEach((permissionId) => this.create(userId, permissionId));
		return true;
	}
	catch (err) {
		return false
	}
}
