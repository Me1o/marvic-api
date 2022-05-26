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
 * @namespace Customer
 */

/**
  *
  * @namespace Customer.Routes
  * @memberof! Customer
  */
const CustomerControllers = require('./controllers');


module.exports = function (app) {
   app.get('/customer/getByPhone', jsonParser, makeCallback(CustomerControllers.getByPhone));
   app.get('/customer/list', authenticate, jsonParser, makeCallback(CustomerControllers.list));
   app.get('/customer/getById',authenticate, jsonParser, makeCallback(CustomerControllers.getById));

};