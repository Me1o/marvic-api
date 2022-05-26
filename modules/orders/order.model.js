/**
 *
 * @namespace Order.Model
 * @memberof! Order
 */

/**
 * @method Define
 * @memberof Order.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const OrderSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
     products: {
      type: DataTypes.TEXT
     },
     customerId: {
      type: DataTypes.INTEGER
    }, 
    storeId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER
    }
    };

  const Order = sequelize.define('Order', OrderSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Order;
};

