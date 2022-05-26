const Joi = require('marvic-api/helpers/joi');
const { Op, where } = require('sequelize');
const { models: { User, Order } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Order.Controllers
   * @method Order
   */
  try {
    let keyword = req.query.keyword;
    let status = req.query.status;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });

    // filters
    var whereStatement = {storeId: user.storeId};
    if(keyword) whereStatement.id =  keyword;
    if(status) whereStatement.status =  status;

    //query
    const orders = await Order.findAll({ where: whereStatement, raw: true });

    res.json({ case: 0, message: orders });
    
 } catch (err) {
   return res.json({ case: 0, message: 'Something went wrong!', err });
 }
};
