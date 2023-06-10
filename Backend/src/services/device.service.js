const { Device } = require("../models");

exports.findOne = async (fields) => {
    return await Device.findOne({ where: fields});
}

exports.findAll = async () => {
    return Device.findAll();
}

exports.create = async ($data) => {
    return await Device.create($data);
}

exports.updated = async(data, id) => {
    return await Device.update(data, { where: {id}});
}

exports.deleted = async (id) => {
    return await Device.findOne( {where: { id }} )
                    .then(result => {
                        return Device.destroy({ where : { id }})
                            .then(u => {
                                return result;
                            })
                    })
}