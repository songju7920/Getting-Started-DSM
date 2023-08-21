module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    userID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    salt: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
  });
};
