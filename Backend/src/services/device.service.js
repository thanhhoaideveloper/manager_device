const { Device } = require("../models");

exports.findOne = async (fields) => {
    return await Device.findOne({ where: fields});
}

exports.findAll = async (filter) => {
    if(!filter.is_active){
        return Device.findAll();
    }
    return Device.findAll({where: filter});
}

exports.create = async (data) => {
    return await Device.create(data);
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