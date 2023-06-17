const { DeviceDepartment } = require("../models");


exports.findAll = async () => {
    return await DeviceDepartment.findAll()
}

exports.addDevice = async (data) => {
    return await DeviceDepartment.bulkCreate(data);
}

// exports.updated = async(data, id) => {
//     return await Department.update(data, { where: {id}});
// }

