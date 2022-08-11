const Joi = require("marvic-api/helpers/joi");
const { Op, where } = require("sequelize");
const {
  models: { User, Order },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof TotalOrders.Controllers
   * @method Order
   */
  try {
    let keyword = req.query.keyword;
    let status = req.query.status;
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;

    // both dateFrom and dateTo should be presented
    if ((dateFrom && !dateTo) || (dateTo && !dateFrom))
      return res.json(
        {
          case: 0,
          message: "both dateFrom and dateTo should be Passed !",
        },
        400
      );

    if (dateFrom) dateFrom = new Date(dateFrom);
    if (dateTo) dateTo = new Date(dateTo);

    let userId = req.user.dataValues.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });

    // filters
    var whereStatement = { storeId: user.storeId };
    if (keyword) whereStatement.id = keyword;
    if (status) whereStatement.status = status;

    //query
    const orders = await Order.findAll({ where: whereStatement, raw: true });

    filtered = orders.filter((order) => {
      var date = new Date(order.createdAt);
      return date >= dateFrom && date <= dateTo;
    });

    let totalOrders = 0;
    if (filtered.length > 0)
      totalOrders = filtered.reduce(
        (order2, order1) => order1.price + order2.price
      );
    res.json({ case: 0, message: filtered, totalPrice: totalOrders });
  } catch (err) {
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
