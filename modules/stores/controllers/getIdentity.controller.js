const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, StoreIdentity } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let id = req.query.id.toLowerCase();
      const identity = await StoreIdentity.findOne({ where: { storeId: id }, raw: true });
      res.json({ case: 0, message: identity });

  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


