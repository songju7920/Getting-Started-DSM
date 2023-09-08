module.exports = (sequelize, Datatypes) => {
  return sequelize.define("comment", {
    commentID: {
      type: Datatypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userID: {
      type: Datatypes.INTEGER(),
      allowNull: false,
      reference: {
        model: "users",
        key: "userID",
      },
    },
    postID: {
      type: Datatypes.INTEGER(),
      allowNull: false,
      reference: {
        model: "posts",
        key: "postID",
      },
    },
    content: {
      type: Datatypes.STRING(225),
      allowNull: false,
    },
    writer: {
      type: Datatypes.STRING(225),
      allowNull: false,
    },
  });
};
