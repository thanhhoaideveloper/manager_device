const tokenJWT = require("../utils/helper.util");
const authConfig = require("../config/auth.config");
const UserService = require("../services/user.service");

exports.isAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).send({
      message: "Not found access token",
    });
  }

  const verifyToken = await tokenJWT.verifyToken(
    accessToken,
    authConfig.accessTokenSecret
	);

  if (!verifyToken) {
    return res.status(401).send({
      message: "Access token invalid",
    });
  }

  const user = await UserService.findOne({
    email: verifyToken.payload.email,
  });

  if (!user) {
    return res.status(401).send({
      message: "Not found user",
    });
  }

  req.user = user;
  return next();
};
