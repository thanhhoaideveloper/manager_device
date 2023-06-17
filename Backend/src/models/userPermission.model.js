module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define("UserPermission", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return UserPermission;
};
