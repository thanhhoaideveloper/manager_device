const bcrypt = require('bcrypt');

const UserService = require("../services/user.service");
const { generateToken } = require("../utils/helper.util");
const authConfig = require('../config/auth.config');
const HttpException = require('../utils/httpException.util');

exports.login = async (req, res, next) => {
    const formData = { email: req.body.email }
    if(!req.body.email || !req.body.password){
        return res.status(404).send({
            message: "Email or password must fill!"
        });
    }
    const user = await UserService.findOne(formData);
    if(!user){
        return res.status(404).send({
            message: "User not found!"
        })
    }

    //check password
    const checkedPassword = bcrypt.compareSync(
        req.body.password,
        user.password
    )

    if(!checkedPassword){
        return res.status(401).send({
            message: 'Password incorrect!'
        })
    }

    //generate access token
    const dataForAccessToken = {
        email: user.email
	}

	const accessToken = await generateToken(dataForAccessToken, authConfig.accessTokenSecret, authConfig.accessTokenLife);
    if(!accessToken){
        return res.status(401).send({ message: "Login failed!"});
    }

    return res.status(200).send({
        accessToken,
        user
    })
}
