const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Customer } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Customer.Controllers
   * @method Customer
   */
  try {

      let phone =  req.query.phone;
      phone = phone.replace(' ','+');
      const customer = await Customer.findOne({ where: { phone: { [Op.substring]: phone } }, raw: true });
      res.json({ case: 0, message: customer });
  
  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


