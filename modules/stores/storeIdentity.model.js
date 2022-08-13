/**
 *
 * @namespace StoreIdentity.Model
 * @memberof! Store
 */

/**
 * @method Define
 * @memberof StoreIdentity.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
 */
module.exports = (sequelize, DataTypes) => {
  const StoreIdentitySchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    storeId: {
      type: DataTypes.INTEGER,
    },
    primaryColor: {
      type: DataTypes.STRING,
    },
    secondaryColor: {
      type: DataTypes.STRING,
    },
    fontName: {
      type: DataTypes.STRING,
    },
    fontFileUrl: {
      type: DataTypes.STRING,
    },
  };

  const StoreIdentity = sequelize.define("StoreIdentity", StoreIdentitySchema, {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  });

  StoreIdentity.sync({ alter: true }).then(() => {
    console.log("store identity table updated");
  });

  return StoreIdentity;
};
