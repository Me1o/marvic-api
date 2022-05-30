const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Order, User } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let orderId = req.body.orderId;
    let status = req.body.status;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId', 'id'], raw: true });
    const order = await Order.findOne({ where: { id: orderId }, attributes: ['storeId', 'status'], raw: true });
    if(order.storeId == user.storeId && (status > 0 && status < 5) ){
      await Order.update({status: status}, { where: { id: orderId } });
    
      res.json({ case: 1, message: status});
     
    }
    else{
      res.json({ case: 0, message: "ownership error/ status range error" });
    }



  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};



