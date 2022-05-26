const Joi = require('marvic-api/helpers/joi');
const { Op, where } = require('sequelize');
const { models: { User, Customer } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Customer.Controllers
   * @method Customer
   */
  try {
    let keyword = req.query.keyword;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });

    // filters
    var whereStatement = {storeId: user.storeId};
    if(keyword) whereStatement.name = { [Op.substring]: keyword };

    //query
    const customers = await Customer.findAll({ where: whereStatement, raw: true });

    res.json({ case: 0, message: customers });
    
 } catch (err) {
   return res.json({ case: 0, message: 'Something went wrong!', err });
 }
};
