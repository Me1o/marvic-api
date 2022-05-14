const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Category } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Category.Controllers
   * @method Category
   */
  try {
     let userId = req.user.dataValues.id;
     const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });
     const categories = await Category.findAll({ where: { storeId: user.storeId }, raw: true });

     res.json({ case: 0, message: categories });
     
   
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};