const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Customer, Order } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Order.Controllers
   * @method Order
   */
  try {

    let id = req.query.id;
    let phone = req.query.id;

      const customer = await Customer.findOne({ where: { phone: phone,  },attributes: ['id', 'name', 'address', 'phone'], raw: true });
      if(customer == null) return null;

      const order = await Order.findOne({ where: { id: id, customerId: customer.id   },attributes: ['id', 'status', 'address', 'price', 'products'], raw: true });
      res.json({ case: 0, message: order });



  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


