const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Post } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Post.Controllers
   * @method Post
   */
  try {
     // let validationResult = isValid(req);
     // if(validationResult != true) return res.json({ case: 0, message: 'Validation Error!', validationResult });

    //Feed logic
    console.log('here');
    res.json({ case: 0, message: 'Feed!' });
     
   
  
  } catch (err) {
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};

function isValid(req){
  const expectedBody = Joi.object().required().keys({
    city: Joi.string().required(),
    date: {start: Joi.date(), end: Joi.date()},
    flexible: {type: Joi.string().allow(''), months: Joi.string().allow('') },
    apartmentType: Joi.string().allow(''),
    amenities: Joi.array()
  });
  const error = Joi.validateAndConvert({ object: req, property: 'body', expectedObject: expectedBody }).error;
  if (error) 
    return error;
  else
    return true;
}
