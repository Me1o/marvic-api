const Joi = require("marvic-api/helpers/joi");
const { Op, where } = require("sequelize");
const {
  models: { User, Order },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof ProductsOrders.Controllers
   * @method ProductsOrders
   */
  try {
    let keyword = req.query.keyword;
    let status = req.query.status;

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

    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = JSON.parse(obj[property]);
        const ids = [key].map((product) => product.productId);
        return ids.reduce((initialValue, id) => {
          acc[id] = acc[id] ? acc[id] : [];
          acc[id].push(obj);
          return acc;
        }, {});
      }, {});
    }

    const groupedOrders = groupBy(orders, "products");

    res.json({ case: 0, message: groupedOrders });
  } catch (err) {
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
