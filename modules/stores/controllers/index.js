/**
 *
 * @namespace Store.Controllers
 * @memberof! Store
 */

module.exports.getInfo = require('./getInfo.controller');
module.exports.createOrUpdate = require('./createOrUpdate.controller');
module.exports.uploadLogo = require('./uploadLogo.controller');
module.exports.isDomainAvailable = require('./isDomainAvailable.controller');

//store endpoints
module.exports.getInfoByDomain = require('./getInfoByDomain.controller');
