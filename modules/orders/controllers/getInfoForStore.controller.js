const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { Customer, Order, ProductOrder, Product },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Order.Controllers
   * @method Order
   */
  try {
    let id = req.query.id;
    let phone = req.query.phone;
    let store = req.query.store;

    phone = phone.replace(" ", "+");

    const customer = await Customer.findOne({
      where: { phone: { [Op.substring]: phone } },
      attributes: ["id", "name", "address", "phone"],
      raw: true,
    });
    if (customer == null)
      return res.json({ case: 0, message: "Something went wrong!", err });

    const order = await Order.findOne({
      where: { id: id, customerId: customer.id, storeId: store },
      attributes: ["id", "status", "address", "price"],
      raw: true,
      nest: true,
      include: [
        {
          model: ProductOrder,
          as: "products",
          attributes: ["productId", "quantity"],
        },
      ],
    });

    if (order == null)
      return res.json({ case: 0, message: "Something went wrong!", err });

    res.json({ case: 1, message: order, customer: customer });
  } catch (err) {
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
