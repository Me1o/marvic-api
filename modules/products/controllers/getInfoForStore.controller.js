const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Product } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Product.Controllers
   * @method Product
   */
  try {

    let id = req.query.id;

      const product = await Product.findOne({ where: { id: id },attributes: ['id', 'name', 'description', 'img1', 'img2', 'img3', 'categoryId', 'price', 'quantity'], raw: true });
      res.json({ case: 0, message: product });
      
   
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


