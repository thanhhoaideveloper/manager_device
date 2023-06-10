const { DepartMentDevice } = require("../models");


exports.findAll = async () => {
    return await DepartMentDevice.findAll()
}

exports.addDevice = async (data) => {
    return await DepartMentDevice.bulkCreate(data);
}

// exports.updated = async(data, id) => {
//     return await Department.update(data, { where: {id}});
// }

