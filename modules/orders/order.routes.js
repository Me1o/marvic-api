const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');
const authenticate = require('marvic-api/helpers/authenticate');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CDNFOLDER,
  },
});
const upload = multer({ storage: storage });


/**
 * @namespace Order
 */

/**
  *
  * @namespace Order.Routes
  * @memberof! Order
  */
const OrderControllers = require('./controllers');


module.exports = function (app) {
   app.post('/order/createOrUpdate', jsonParser, makeCallback(OrderControllers.createOrUpdate));
   app.get('/order/list', authenticate, jsonParser, makeCallback(OrderControllers.list));

};