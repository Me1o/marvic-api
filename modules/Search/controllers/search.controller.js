const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Availability, Building, Property, Reservation } } = require('marvic-api/helpers/models');

module.exports = async (req, res) => {
  /**
   * @memberof Search.Controllers
   * @method Search
   */
  try {
      let validationResult = isValid(req);
      if(validationResult != true) return res.json({ case: 0, message: 'Validation Error!', validationResult });

      //Search logic
      let body = req.body;

      //property filter
      let propertyFilter = {};
      if(body.apartmentType) propertyFilter = {type: body.apartmentType};
      let amenitiesFilter = {};
      //amenities filter
      if(body.amenities.length != 0) amenitiesFilter =  {type: body.apartmentType};

      console.log(propertyFilter);

      if(body.date.start && body.date.end){
        const match = await Availability.findAll({ raw: true, where: { [Op.and]: [
          { start_date: { [Op.lte]: body.date.start } },
          { end_date: { [Op.gte]: body.date.end } }
        ]},
        include: { model: Property, as: 'Property', where: propertyFilter,
        include: { model: Building, as: 'Building',  where: {
          city: body.city
        } } }} );

        if(match.length != 0){
          return res.json({ case: 1, message: 'match!' , match });
        }
        else{
          var start = new Date(tbody.date.start);
          var end = new Date(tbody.date.end);
          //startRange = new Date(start - (72 * 60 * 60 * 1000));
          //endRange =  new Date(end + (72 * 60 * 60 * 1000));
          console.log(start);
          const alt = await Availability.findAll({ raw: true, where: { [Op.and]: [
            { start_date: { [Op.lte]: startRange } },
            { end_date: { [Op.gte]: endRange } }
          ]},
          include: { model: Property, as: 'Property', where: propertyFilter,
          include: { model: Building, as: 'Building',  where: {
            city: body.city
          } } }} );
          if(alt.length != 0){
            return res.json({ case: 1, message: 'alt!' , alt });
          }
        }
      }
      else{

      }
   
  
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
