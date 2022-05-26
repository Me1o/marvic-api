/**
 *
 * @namespace Category.Controllers
 * @memberof! Category
 */

module.exports.list = require('./list.controller');
module.exports.create = require('./create.controller');

//store endpoints
module.exports.listForStore = require('./listForStore.controller');
