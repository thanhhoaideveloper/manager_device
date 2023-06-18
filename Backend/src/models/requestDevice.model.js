module.exports = (sequelize, DataTypes) => {
  const RequestDevice = sequelize.define(
    "RequestDevice",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tittle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        default: 1,
      },
      department_from: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      deletedAt: "deletedAt",
      paranoid: true,
    }
  );

  return RequestDevice;
};
