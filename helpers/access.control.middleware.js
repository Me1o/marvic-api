/**
 * Access Control Method
 *
 * This controller is responsible for cross origin calls
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */

function accessControl (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Accept');
  res.header('Access-Control-Allow-Headers', 'apikey');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
}

module.exports = accessControl;