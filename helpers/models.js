/**
 * Helper to Initialize the database models, and the database connection.
 * It also define the relation ship between each model ( table )
 */
const glob = require('glob');
const path = require('path');
/**
 * @typedef {Object} Sequelize
 */
const db = {};
const { Sequelize } = require('sequelize');
const { DB_PASS = '', DB_NAME = 'marvic', DB_HOST = 'localhost', DB_USER = '', DB_PORT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {ssl: {require: true,rejectUnauthorized: false}},
  port: DB_PORT,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  pool: {
    max: 500,
    idle: 1000,
    evict: 1000
  }
});

 
const modelsPaths = glob.sync('./modules/**/*.model.js');

modelsPaths.forEach(modelPath => {
  require(path.join('../', modelPath))(sequelize, Sequelize.DataTypes);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
const {
 Category
} = sequelize.models;

//Property.belongsTo(Building, { foreignKey: 'building_id', allowNull: false, as: 'Building' });


sequelize.sync();

module.exports = { models: sequelize.models, sequelize, Sequelize };
