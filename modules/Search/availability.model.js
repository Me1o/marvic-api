/**
 *
 * @namespace Availability.Model
 * @memberof! Availability
 */

/**
 * @method Define
 * @memberof Availability.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const AvailabilitySchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    is_blocked: { type: DataTypes.BOOLEAN, allowNull: false },
    };

  const Availability = sequelize.define('Availability', AvailabilitySchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Availability;
};
