module.exports = (sequelize, DataTypes) => {
  return sequelize.define("post", {
    postID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "users",
        key: "userID",
      },
    },
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    isSold: {
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false,
    },
  });
};
