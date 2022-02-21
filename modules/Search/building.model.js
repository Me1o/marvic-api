/**
 *
 * @namespace Building.Model
 * @memberof! Buildings
 */

/**
 * @method Define
 * @memberof Building.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const BuildingSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    city: {
      type: DataTypes.ENUM("Dubai", "Montreal"),
      defaultValue: "Dubai"
     },
    };

  const Building = sequelize.define('Building', BuildingSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Building;
};

