require("dotenv").config();
const bcrypt = require("bcrypt");
const userRoot = {
  name: process.env.USER_NAME || "admin",
  password: bcrypt.hashSync(process.env.USER_PASSWORD || "password", 10),
  email: process.env.USER_EMAIL || "nguyenluan60@gmail.com",
  is_root: true,
};

module.exports = userRoot;
