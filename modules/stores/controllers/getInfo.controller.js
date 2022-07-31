const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Store } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let id = req.query.id;
    let userId = req.user.dataValues.id;

    const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });
    if(user.storeId){
      const store = await Store.findOne({ where: { id: user.storeId }, raw: true });
      res.json({ case: 0, message: store });
    }
    else{
      return res.json({ case: 0, message: 'Something went wrong!: store ownership error' });
    }


  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


