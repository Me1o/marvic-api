const requiredParam = require('marvic-api/helpers/required.param');

/**
 * Callback to wrap the function in try catch clause
 * @param {Function} providedFunction - function to wrap in try catch
 */
function makeCallback (providedFunction = requiredParam('providedFunction')) {
  return async function (req, res, next) {
    try {
      await providedFunction(req, res, next);
    } catch (err) {

    }
  };
}

module.exports = makeCallback;