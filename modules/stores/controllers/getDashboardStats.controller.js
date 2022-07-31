const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Customer, Store, User, Order, Product, Category } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });
    if(user.storeId){
      const store = await Store.findOne({ where: { id: user.storeId }, raw: true });
      const clients = await Customer.count({ col: 'storeId', where: { storeId: user.storeId } });
      const newOrders = await Order.count({where: { storeId: user.storeId, status: 0} });
      const currentOrders = await Order.count({where: { storeId: user.storeId, status: 1} });
      const doneOrders = await Order.count({where: { storeId: user.storeId, status: 2} });
      const category = await Category.count({where: { storeId: user.storeId} });
      const product = await Product.count({where: { storeId: user.storeId} });

      res.json({ case: 0, message: {store: store, customers: clients, newOrders: newOrders, currentOrders: currentOrders, doneOrders: doneOrders, product: product, category: category } });
    }
    else{
      return res.json({ case: 0, message: 'Something went wrong!: store ownership error' });
    }


  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


