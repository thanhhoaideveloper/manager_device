const { User } = require("../models");

exports.findOne = async (fields) => {
    return await User.findOne({ where: fields});
}

exports.findAll = async () => {
    return await User.findAll();
}

exports.create = async (fromData) => {
    return await User.create(fromData);
}

exports.updated = async (id, formData) => {
    return await User.update(formData, {where: { id }});
}

exports.deleted = async(id) => {
    return await User.findOne({ where: { id }})
                    .then(result => {
                        return User.destroy({ where : { id }})
                            .then(u => {
                                return result;
                            })
                    })
}