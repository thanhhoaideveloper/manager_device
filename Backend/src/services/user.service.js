const { User } = require("../models");

exports.findOne = async (fields) => {
    return await User.findOne({ where: fields})
        .then((res) => {
            return {
                status: true,
                value: res
            }
        })
        .catch((err) => {
            return {
                status: false,
                value: err.errors[0].message
            }
        })
}

