require('dotenv').config();
const dbConfig = require("../config/db.config");
const userRoot = require("../config/userRoot.config");
const PermissionConstant = require("../utils/permissionConstant.utils");

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.model');
const categoryModel = require('./category.model');
const deviceModel = require('./device.model');
const departmentModel = require('./department.model');
const deviceDepartmentModel = require('./deviceDepartment.model');
const permissionModel = require('./role.model');
const userPermissionModel = require('./userPermission.model');
const requestDeviceModel = require("../models/requestDevice.model");
const deviceDamagedModel = require("../models/deviceDamaged.model");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: false
})

const DeviceDepartment = deviceDepartmentModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const Device = deviceModel(sequelize, DataTypes);
const Department = departmentModel(sequelize, DataTypes);
const Permission = permissionModel(sequelize, DataTypes);
const UserPermission = userPermissionModel(sequelize, DataTypes);
const RequestDevice = requestDeviceModel(sequelize, DataTypes);
const DeviceDamaged = deviceDamagedModel(sequelize, DataTypes);

//default User
// User.bulkCreate([{
//   name: "Admin",
//   email: 'hoai@gmail.com',
//   password: bcrypt.hashSync('password', 10)
// }])

//relationship
Device.belongsToMany(Department, { through: 'DeviceDepartment', onDelete: 'cascade', foreignKey: "device_id"});
Department.belongsToMany(Device, { through: 'DeviceDepartment', onDelete: 'cascade', foreignKey: "department_id" });
Device.hasMany(DeviceDamaged, { foreignKey: "device_id" });
DeviceDamaged.belongsTo(Device, { foreignKey: "device_id" });
Permission.belongsToMany(User, { through: 'UserPermission', onDelete: 'cascade', foreignKey: 'permission_id' });
User.belongsToMany(Permission, { through: 'UserPermission', onDelete: 'cascade', foreignKey: 'user_id' });

User.hasMany(RequestDevice, { foreignKey: "user_id" });
RequestDevice.belongsTo(User, { foreignKey: "user_id" });

sequelize.sync({ force: true }).then(()=>{
	console.log('Connect DB successfully!');

	// Create data seeding
	User.findOne({ where: { email: userRoot.email } }).then((user) => {
		if (!user) {
			console.log("begin create data seeding...");
			return User.create(userRoot).then((res) => {
				for (const key in PermissionConstant) {
          Permission.create({
            name: key,
            description: PermissionConstant[key],
          }).then((res2) => {
            res2.addUser(res, { through: { selfGranted: false } });
          });
				}
				console.log("Successful!!!");
			});
		}
	})
})


module.exports = {
  User,
  Category,
  Device,
  Department,
	DeviceDepartment,
	Permission,
	UserPermission,
	DeviceDamaged
}
