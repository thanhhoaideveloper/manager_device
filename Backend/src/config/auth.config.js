require("dotenv").config();
const auth = {
	accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
module.exports = auth;