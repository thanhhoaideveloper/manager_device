require("dotenv").config();

const db = {
	connectionLimit: 10,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_NAME || "root",
	password: process.env.DB_PASSWORD || "",

};

module.exports = db;