const { User, Permission } = require("../models");

exports.findOne = async (fields) => {
  return await User.findOne({ where: fields });
};

exports.findAll = async () => {
  return User.findAll();
};

exports.create = async (fromData) => {
  return await User.create(fromData);
};

exports.updated = async (id, formData) => {
  return await User.update(formData, { where: { id } });
};

exports.deleted = async (id) => {
  return await User.findOne({ where: { id } }).then((result) => {
    return User.destroy({ where: { id } }).then((u) => {
      return result;
    });
  });
};

exports.hasPermission = async (id,permission) => {
	return await User
		.findOne({
			where: { id },
			include: {
				model: Permission,
				where: { name: permission }
			}
		})
		.then((data) => {
			return true;
		})
		.catch((err) => {
			return false;
		});
}
exports.listPermission = async (id) => {
	return await User
		.findOne({
			where: { id },
			include: {
				model: Permission,
			}
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			return false;
	})
}