const { Despartment, Device } = require("../models");

exports.findOne = async (fields) => {
    return await Despartment.findOne({ where: fields});
}

exports.findAll = async () => {
    return Despartment.findAll();
}

exports.create = async ($data) => {
    return await Despartment.create($data);
}

exports.updated = async(data, id) => {
    return await Despartment.update(data, { where: {id}});
}

exports.deleted = async (id) => {
    return await Despartment.findOne( {where: { id }} )
                    .then(result => {
                        return Despartment.destroy({ where : { id }})
                            .then(u => {
                                return result;
                            })
                    })
}

exports.getAllDevice = async (fields) => {
    return Despartment.findOne({ where: fields , include: Device})
}