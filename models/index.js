const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config");

const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./board")(sequelize, Sequelize);

module.exports = db;
