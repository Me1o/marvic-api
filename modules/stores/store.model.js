/**
 *
 * @namespace Store.Model
 * @memberof! Store
 */

/**
 * @method Define
 * @memberof Store.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const StoreSchema = {
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
    category: {
      type: DataTypes.INTEGER
    }, 
    storeLogoUrl: {
      type: DataTypes.STRING
    },
    store_policy: {
      type: DataTypes.STRING
    },
    primary_contact_number: {
      type: DataTypes.INTEGER
    },
    secondary_contact_number: {
      type: DataTypes.INTEGER
    },
    support_email: {
      type: DataTypes.STRING
    }
    };

  const Store = sequelize.define('Store', StoreSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Store;
};

