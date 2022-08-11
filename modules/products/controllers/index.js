/**
 *
 * @namespace Product.Controllers
 * @memberof! Product
 */

module.exports.list = require("./list.controller");
module.exports.getInfo = require("./getInfo.controller");
module.exports.createOrUpdate = require("./createOrUpdate.controller");
module.exports.uploadProductImage = require("./uploadProductImage.controller");
module.exports.delete = require("./delete.controller");
module.exports.toggleAvailability = require("./toggleAvailabilty.controller");

//store endpoints
module.exports.listByCategoryId = require("./listByCategoryId.controller");
module.exports.getInfoForStore = require("./getInfoForStore.controller");
