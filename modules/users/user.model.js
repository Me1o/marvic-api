/**
 *
 * @namespace User.Model
 * @memberof! User
 */

/**
 * @method Define
 * @memberof User.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const UserSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [2, 99]
      }
    },
    storeId: {
      type: DataTypes.INTEGER,
      required: false
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      isEmail: true, 
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8, 99]
      }
    },
    role: {
      type: DataTypes.ENUM('owner', 'admin', 'customer'),
      defaultValue: 'owner',
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
   };

  const User = sequelize.define('User', UserSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },{
    instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        }
      }
   });

   User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
  });


  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }


  return User;
};

