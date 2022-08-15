/**
 *
 * @namespace Category.Controllers
 * @memberof! Category
 */

module.exports.list = require('./list.controller');
module.exports.createOrUpdate = require('./createOrUpdate.controller');

//store endpoints
module.exports.listForStore = require('./listForStore.controller');
