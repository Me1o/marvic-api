/**
 *
 * @namespace ProductOrder.Model
 * @memberof! Order
 */

/**
 * @method Define
 * @memberof ProductOrder.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
 */
module.exports = (sequelize, DataTypes) => {
  const ProductOrderSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.INTEGER,
    },
    storeId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    OrderId: {
      type: DataTypes.INTEGER,
    },
  };

  const ProductOrder = sequelize.define("ProductOrder", ProductOrderSchema, {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  });

  ProductOrder.associate = (models) => {
    ProductOrder.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    ProductOrder.belongsTo(models.Order);
  };

  ProductOrder.sync({ alter: true }).then(() => {
    console.log("product order table updated");
  });

  return ProductOrder;
};
