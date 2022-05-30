/**
 *
 * @namespace Invite.Model
 * @memberof! Invite
 */

/**
 * @method Define
 * @memberof Invite.Model
 * @param {Object} sequelize - Sequelize object
 * @param {Object} DataTypes - Sequelize data types
  */
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const InviteSchema = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER, autoIncrement: true
    },
    Code: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [4, 4]
      }
    },
    validTill: {
      type: DataTypes.DATEONLY
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
   };

  const Invite = sequelize.define('Invite', InviteSchema, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },{
    instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        }
      }
   });

   Invite.beforeCreate((Invite, options) => {

    return bcrypt.hash(Invite.password, 10)
        .then(hash => {
            Invite.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
  });


  Invite.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }


  return Invite;
};

