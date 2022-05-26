const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Customer, Order, Product } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let orderObj = req.body.order;
    let customerObj = req.body.customer;
    let storeid = req.body.storeId;
    let newCustomerId;

    //check for customer
    const customer = await Customer.findOne({ where: { phone: customerObj.phone, storeId: storeid }, raw: true });
    if(customer == null){
      await Customer.create(
        { name: customerObj.name, phone: customerObj.phone, address: customerObj.address, storeId: storeid },
        { raw: true, returning: true }
      ).then(result => 
        {
          newCustomerId = result.id ;
        }
      );
    }else{
      newCustomerId = customer.id;
    }

    var orderProducts = [];
    var price = 0;
    let orderId; 
    for(let obj of orderObj.orderProducts){
      let product = await Product.findOne({ where: { id: obj.productId, storeId: storeid }, raw: true });
      if(product != null){
        price = price + product.price;
        orderProducts.push(JSON.stringify(obj));
      }
    }
    await Order.create(
      { products: orderProducts.join(), customerId: newCustomerId, address: orderObj.address, price: price, storeId: storeid },
      { raw: true, returning: true }
    ).then(result => 
      {
        orderId = result.id ;
      }
    );

     res.json({ case: 1, message: orderId });
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};



