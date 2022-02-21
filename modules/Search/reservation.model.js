/**
 *
 * @namespace Reservation.Model
 * @memberof! Reservation
 */

/**
 * @method Define
 * @memberof Reservation.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const ReservationSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    check_in: { type: DataTypes.DATE, allowNull: false },
    check_out: { type: DataTypes.DATE, allowNull: false }
    };

  const Reservation = sequelize.define('Reservation', ReservationSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Reservation;
};
