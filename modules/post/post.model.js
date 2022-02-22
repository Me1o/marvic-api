/**
 *
 * @namespace Post.Model
 * @memberof! Posts
 */

/**
 * @method Define
 * @memberof Post.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
module.exports = (sequelize, DataTypes) => {
  const PostSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM("TXT", "IMG"),
      defaultValue: "TXT"
     },
     date: {
      type: DataTypes.DATE
     },
     userId: {
      type: DataTypes.INTEGER
     },
     mediaUrl: {
      type: DataTypes.STRING
    }
    };

  const Post = sequelize.define('Post', PostSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  return Post;
};

