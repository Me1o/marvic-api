const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Store } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let domain = req.query.domain;
      const store = await Store.findOne({ where: { domain: domain }, raw: true });
      res.json({ case: 0, message: store });
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


