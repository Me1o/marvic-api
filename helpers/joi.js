const Joi = require('@hapi/joi');
const requiredParam = require('marvic-api/helpers/required.param');

/**
 * @type {Joi}
 */
const CustomJoi = Joi.defaults(setAbortEarlyToFalse)
  .extend(notTrimmedString)
  .extend(trimStrings);

function setAbortEarlyToFalse (joi) {
  return joi.options({ abortEarly: false });
}

function notTrimmedString (joi) {
  return {
    base: joi.string(),
    type: 'notTrimmedString'
  };
}

function trimStrings (joi) {
  return {
    base: joi.string().trim(),
    type: 'string'
  };
}


CustomJoi.validateAndConvert = function validateAndConvert ({ expectedObject = requiredParam('expectedObject'), object = requiredParam('object'), property = requiredParam('property') }) {
  const { error, value } = expectedObject.validate(object[property]);

  object[property] = value;
  return { error, value };
};

module.exports = CustomJoi;