const { DeviceDamaged } = require("../models");

exports.findOne = async (fields) => {
  return await DeviceDamaged.findOne({ where: fields });
};

exports.findAll = async (filter) => {
  if (!filter.is_active) {
    return DeviceDamaged.findAll();
  }
  return DeviceDamaged.findAll({ where: filter });
};

exports.create = async (data) => {
  return await DeviceDamaged.create(data);
};

exports.updated = async (data, id) => {
  return await DeviceDamaged.update(data, { where: { id } });
};

exports.deleted = async (id) => {
  return await DeviceDamaged.findOne({ where: { id } }).then((result) => {
    return DeviceDamaged.destroy({ where: { id } }).then((u) => {
      return result;
    });
  });
};
