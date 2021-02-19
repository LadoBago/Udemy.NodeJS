const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "mysql", {
  dialect: "mysql",
  host: "localhost",
  port: "3306",
  logging: console.log,
});

module.exports = sequelize;
