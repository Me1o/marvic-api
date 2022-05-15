/**
 *
 * @namespace Product.Model
 * @memberof! Product
 */

/**
 * @method Define
 * @memberof Product.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const ProductSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
     name: {
      type: DataTypes.STRING
     },
     description: {
      type: DataTypes.STRING
    },
    img1: {
      type: DataTypes.STRING
    },
    img2: {
      type: DataTypes.STRING
    },
    img3: {
      type: DataTypes.STRING
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
    storeId: {
      type: DataTypes.INTEGER
    },
    cost: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    }
    };

  const Product = sequelize.define('Product', ProductSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Product;
};

