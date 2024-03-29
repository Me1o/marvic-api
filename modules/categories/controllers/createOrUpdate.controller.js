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
     let category = req.body;
     const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });

     if(category.id){
      await Category.update(
        {
          name: category.name,
          description: category.description,
        },
        { where: { id: category.id } }
      )
     }else{
      await Category.create(
        { name: category.name, storeId: user.storeId},
        { raw: true, returning: true }
      )
     }


     res.json({ case: 0, message: true });



  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};
