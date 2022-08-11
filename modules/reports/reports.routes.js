const jsonParser = require("body-parser").json({ extended: true });
const makeCallback = require("marvic-api/helpers/make.callback");
const authenticate = require("marvic-api/helpers/authenticate");

/**
 * @namespace Report
 */

/**
 *
 * @namespace Reports.Routes
 * @memberof! Reports
 */
const ReportsControllers = require("./controllers");

module.exports = function (app) {
  app.get(
    "/reports/orders",
    authenticate,
    jsonParser,
    makeCallback(ReportsControllers.totalOrders)
  );
  app.get(
    "/reports/products",
    authenticate,
    jsonParser,
    makeCallback(ReportsControllers.productsOrders)
  );
};
