const { verifyToken } = require("../utils/helper.util");
const authConfig = require('../config/auth.config');
const UserService = require('../services/user.service');

exports.isAuth = async (req, res, next) => {
    const accessToken = req.headers.authorization;

    if(!accessToken){
        return res.status(401).send({
            message: "Not found access token"
        });
    }

    const verifyToken = await verifyToken(
        accessToken,
        authConfig.accessTokenSecret
    );
    if(!verifyToken){
        res.status(401).send({
            message: "Access token invalid"
        });
    }

    const user = await UserService.findOne({
        email: verifyToken.payload.email
    });

    if(!user.status){
        res.status(401).send({
            message: "Not found user"
        })
    }

    req.user = user.value;
    return next();
}