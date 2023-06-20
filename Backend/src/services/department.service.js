const { Department, Device } = require("../models");

exports.findOne = async (fields) => {
    return await Department.findOne({ where: fields});
}

exports.findAll = async () => {
    return Department.findAll();
}

exports.create = async ($data) => {
    return await Department.create($data);
}

exports.updated = async(data, id) => {
    return await Department.update(data, { where: {id}});
}

exports.deleted = async (id) => {
    return await Department.findOne( {where: { id }} )
                    .then(result => {
                        return Department.destroy({ where : { id }})
                            .then(u => {
                                return result;
                            })
                    })
}

exports.getAllDevice = async (fields) => {
    return Department.findOne({ where: fields , include: Device})
}