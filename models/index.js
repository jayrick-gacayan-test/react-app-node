const dbConfig = require("../config");

const Sequelize = require("sequelize");
const { production } = require("../config");
const sequelize = new Sequelize(production.DATABASE, 
      production.USER, production.PASSWORD, {
  host: production.HOST,
  dialect: production.dialect,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  pool: {
    max: production.pool.max,
    min: production.pool.min,
    acquire: production.pool.acquire,
    idle: production.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

db.todos = require("./Todo")(sequelize, Sequelize);

module.exports = db;