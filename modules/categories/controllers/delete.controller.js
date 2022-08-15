const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Category } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Category.Controllers
   * @method Category
   */
  try {

    let categoryId = req.body.categoryId;
    let userId = req.user.dataValues.id;
    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId', 'id'], raw: true });
    const category = await Category.findOne({ where: { id: categoryId }, attributes: ['storeId', 'id'], raw: true });
    if(category.storeId == user.storeId){

      const count = await Category.destroy({ where: { id: categoryId } });

      res.json({ case: 1, message: true});

    }
    else{
      res.json({ case: 0, message: "ownership error/ status range error" });
    }




  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};





