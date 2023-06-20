const { RequestDevice, User, DeviceDepartment } = require("../models");
const { Op } = require("sequelize");

exports.findOne = async (fields) => {
  return await RequestDevice.findOne({ where: fields });
};

exports.findAll = async (filter) => {
  if (!filter.is_active) {
    return RequestDevice.findAll();
  }
  return RequestDevice.findAll({ where: filter });
};

exports.create = async (data) => {
	const checkUser = await User.findOne({ where: { id: data.user_id } })
	if (!checkUser) return false;

	const checkDevice = await DeviceDepartment.findOne({
		where: {
			device_id: data.device_id,
			department_id: data.department_from,
			quantity: {
				[Op.gte]: data.quantity
			}
		}
	});
	if (!checkDevice) return false;

	return await RequestDevice.create(data)
		.then((res) => { return res; })
		.catch((err) => { return false });
};

exports.updated = async (data, id) => {
  return await RequestDevice.update(data, { where: { id } });
};

exports.deleted = async (id) => {
  return await RequestDevice.findOne({ where: { id } }).then((result) => {
    return RequestDevice.destroy({ where: { id } }).then((u) => {
      return result;
    });
  });
};
