/**
 *
 * @namespace Category.Model
 * @memberof! Category
 */

/**
 * @method Define
 * @memberof Category.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const CategorySchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    storeId: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: false
    },
     name: {
      type: DataTypes.STRING
     },
     description: {
      type: DataTypes.STRING
    },
    productsCount: {
      type: DataTypes.VIRTUAL
    }
    };

  const Category = sequelize.define('Category', CategorySchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Category;
};

