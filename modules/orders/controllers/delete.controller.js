const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Order, User, Product } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let orderId = req.body.orderId;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId', 'id'], raw: true });
    const order = await Order.findOne({ where: { id: orderId }, raw: true });
    if(order.storeId == user.storeId){
      let products = order.products.split("},");
      for(let p of products){
        if(p.slice(-1) != '}') p = p + '}';
        p = JSON.parse(p);
        const product = await Product.findOne({ where: { id: p.productId }, raw: true });
        let q = product.quantity + p.quantity;
        await Product.update({quantity: q}, { where: { id: product.id } });
      }
      const count = await Order.destroy({ where: { id: orderId } });

      res.json({ case: 1, message: true});
     
    }
    else{
      res.json({ case: 0, message: "ownership error/ status range error" });
    }



  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};





