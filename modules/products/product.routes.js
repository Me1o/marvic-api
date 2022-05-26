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
 * @namespace Product
 */

/**
  *
  * @namespace Product.Routes
  * @memberof! Product
  */
const ProductControllers = require('./controllers');


module.exports = function (app) {

   app.get('/product/list',authenticate, jsonParser, makeCallback(ProductControllers.list));
   app.get('/product/get',authenticate, jsonParser, makeCallback(ProductControllers.getInfo));
   app.post('/product/createOrUpdate',authenticate, jsonParser, makeCallback(ProductControllers.createOrUpdate));
   app.post('/product/uploadProductImage',upload.single('logo'),authenticate, makeCallback(ProductControllers.uploadProductImage));

   // store endpoints
   app.get('/product/listByCategoryId', jsonParser, makeCallback(ProductControllers.listByCategoryId));
   app.get('/product/getForStore', jsonParser, makeCallback(ProductControllers.getInfoForStore));

};