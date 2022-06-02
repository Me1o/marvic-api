const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { User, Store } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {

    let domain = req.query.domain.toLowerCase();

    const store = await Store.findOne({ where: { domain: domain }, attributes: ['domain'], raw: true });
    if(store){
      res.json({ case: 0, message: false });
    }
    else{
      res.json({ case: 0, message: true });
    }     
   
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};


