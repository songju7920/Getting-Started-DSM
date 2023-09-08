module.exports = (sequelize, DataTypes) => {
  return sequelize.define("cocomment", {
    cocommentID: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    commentID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      reference: {
        model: "comments",
        key: "commentID",
      },
    },
    postID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      reference: {
        model: "posts",
        key: "postID",
      },
    },
    userID: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      reference: {
        model: "users",
        key: "userID",
      },
    },
    content: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
  });
};
