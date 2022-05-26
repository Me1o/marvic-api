const Joi = require('marvic-api/helpers/joi');
const { Op, where } = require('sequelize');
const { models: { User, Product } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Product.Controllers
   * @method Product
   */
  try {
    let categoryId = req.query.categoryId;
    //query
    const Products = await Product.findAll({ where: {categoryId: categoryId}, raw: true });

    res.json({ case: 0, message: Products });
    
 } catch (err) {
   return res.json({ case: 0, message: 'Something went wrong!', err });
 }
};
