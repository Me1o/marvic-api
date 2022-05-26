/**
 *
 * @namespace Customer.Model
 * @memberof! Customer
 */

/**
 * @method Define
 * @memberof Customer.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const CustomerSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
     name: {
      type: DataTypes.STRING
     },
     phone: {
      type: DataTypes.STRING
    },
    storeId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.TEXT
    }
    };

  const Customer = sequelize.define('Customer', CustomerSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Customer;
};

