const mysql = require("mysql2")
const dbConfig = require("../configs/db.config");

var connection = mysql.createPool({
  ...dbConfig
})

module.exports = connection;