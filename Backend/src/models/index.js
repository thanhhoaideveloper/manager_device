require('dotenv').config();
const dbConfig = require("../config/db.config");
const bcrypt = require("bcrypt");

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.model');
const categoryModel = require('./category.model');
const deviceModel = require('./device.model');
const despartmentModel = require('./department.model');
const deviceDespartmentModel = require('./deviceDepartment.model');

const sequelize = new Sequelize(process.env.DATABASE, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: false
})

const DeviceDepartment = deviceDespartmentModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const Device = deviceModel(sequelize, DataTypes);
const Despartment = despartmentModel(sequelize, DataTypes);

//default User
// User.bulkCreate([{
//   name: "Admin",
//   email: 'hoai@gmail.com',
//   password: bcrypt.hashSync('password', 10)
// }])

//relationship
Device.belongsToMany(Despartment, { through: 'DeviceDepartment', onDelete: 'cascade', foreignKey: "device_id"});
Despartment.belongsToMany(Device, { through: 'DeviceDepartment', onDelete: 'cascade', foreignKey: "despartment_id" });

sequelize.sync({ force: false }).then(()=>{
  console.log('Connect DB successfully!')
})

module.exports = {
  User,
  Category,
  Device,
  Despartment,
  DeviceDepartment
}

