const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof User.Controllers
   * @method User
   */
  try {
    res.json({ case: 0, message: req.user.dataValues });
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


