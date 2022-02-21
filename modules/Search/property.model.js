/**
 *
 * @namespace Property.Model
 * @memberof! Properties
 */

/**
 * @method Define
 * @memberof Property.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const PropertySchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    title: { type: DataTypes.STRING, defaultValue: 'N/A' },
    type: {
      type: DataTypes.ENUM("1bdr", "2bdr", "3bdr"),
      defaultValue: "1bdr"
     },
     amenities:{
      type: DataTypes.JSON,
      allowNull: true
    },
  };

  const Property = sequelize.define('Property', PropertySchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Property;
};


//'WiFi', 'Pool', 'Garden', 'Tennis table', 'Parking'