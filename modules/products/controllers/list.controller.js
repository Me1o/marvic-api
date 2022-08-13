const Joi = require("marvic-api/helpers/joi");
const { Op, where } = require("sequelize");
const {
  models: { User, Product },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Product.Controllers
   * @method Product
   */
  try {
    let categoryId = req.query.categoryId;
    let keyword = req.query.keyword;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });

    // filters
    var whereStatement = { storeId: user.storeId };
    if (categoryId) whereStatement.categoryId = categoryId;
    if (keyword) whereStatement.name = { [Op.substring]: keyword };

    //query
    const Products = await Product.findAll({
      where: whereStatement,
      raw: true,
    });

    res.json({ case: 0, message: Products });
  } catch (err) {
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
