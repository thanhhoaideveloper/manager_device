module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
				type: DataTypes.STRING,
				allowNull: true,
      },
    },
    {
      deletedAt: "deletedAt",
      paranoid: true,
    }
  );

  return Permission;
};
