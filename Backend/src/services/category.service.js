const { Category } = require('../models/index');

exports.findAll = async () => {
    return await Category.findAll();
}

exports.create = async (formData) => {
    return await Category.create(formData)
        .then(res => {
            return {
                status: true,
                value: res
            }
        })
        .catch(err => {
            return {
                status: false,
                value: err.errors[0].message
            }
        })
}

exports.fillOne = async (fields) => {
    return await Category.findAll({
        where: fields
    })
        .then(res => {
            return {
                status: true,
                value: res
            }
        })
        .catch(err => {
            return {
                status: false,
                value: err.errors[0].message
            }
        })
}

exports.update = async (data, id) => {
    return await Category.update(data, {
        where: { id }
    })
        .then(([res]) => {
            return {
                status: true,
                value: res
            }
        })
        .catch(err => {
            return {
                status: false,
                value: err.errors[0].message
            }
        })
}

exports.deleted = async (id) => {
    return await Category.destroy({
        where: { id }
    });
}