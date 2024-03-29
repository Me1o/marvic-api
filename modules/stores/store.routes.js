const jsonParser = require("body-parser").json({ extended: true });
const makeCallback = require("marvic-api/helpers/make.callback");
const authenticate = require("marvic-api/helpers/authenticate");
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
 * @namespace Store
 */

/**
 *
 * @namespace Store.Routes
 * @memberof! Store
 */
const StoreControllers = require("./controllers");

module.exports = function (app) {
  app.get(
    "/store/get",
    authenticate,
    jsonParser,
    makeCallback(StoreControllers.getInfo)
  );
  app.post(
    "/store/createOrUpdate",
    authenticate,
    jsonParser,
    makeCallback(StoreControllers.createOrUpdate)
  );
  app.post(
    "/store/uploadLogo",
    upload.single("logo"),
    authenticate,
    makeCallback(StoreControllers.uploadLogo)
  );
  app.get(
    "/store/isDomainAvailable",
    authenticate,
    jsonParser,
    makeCallback(StoreControllers.isDomainAvailable)
  );
  app.get(
    "/store/getStats",
    authenticate,
    jsonParser,
    makeCallback(StoreControllers.getDashboardStats)
  );
  app.post(
    "/store/identity",
    authenticate,
    jsonParser,
    makeCallback(StoreControllers.updateIdentity)
  );

  //store endpoints
  app.get(
    "/store/getByDomain",
    jsonParser,
    makeCallback(StoreControllers.getInfoByDomain)
  );
  app.get(
    "/store/getIdentity",
    jsonParser,
    makeCallback(StoreControllers.getIdentity)
  );
};
