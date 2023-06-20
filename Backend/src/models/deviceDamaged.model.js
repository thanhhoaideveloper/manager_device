module.exports = (sequelize, DataTypes) => {
  const DeviceDamaged = sequelize.define(
    "DeviceDamaged",
    {
      device_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      check_date: {
        type: DataTypes.DATE,
      },
    },
    {
      deletedAt: "deletedAt",
      paranoid: true,
    }
  );

  return DeviceDamaged;
};
