const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { User, Product },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Product.Controllers
   * @method ToggleAvailability
   */
  try {
    let productId = req.body.productId;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId", "id"],
      raw: true,
    });
    const product = await Product.findOne({
      where: { id: productId },
      attributes: ["storeId", "id", "isActive"],
      raw: true,
    });
    const currentState = product.isActive;
    if (product.storeId == user.storeId) {
      await Product.update(
        { isActive: !currentState },
        { where: { id: productId } }
      );

      res.json({ case: 1, message: !currentState });
    } else {
      res.json({ case: 0, message: "ownership error/ status range error" });
    }
  } catch (err) {
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
