const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { Store, User, StoreIdentity },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {
    let validationResult = isValid(req);
    if (validationResult != true)
      return res.json({
        case: 0,
        message: "Validation Error!",
        validationResult,
      });

    let userId = req.user.dataValues.id;
    let user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });

    let store = req.body;
    if (user.storeId != null) {
      //update store
      await Store.update(
        {
          name: store.name,
          description: store.description,
          category: store.category,
          store_policy: store.store_policy,
          primary_contact_number: store.primary_contact_number,
          secondary_contact_number: store.secondary_contact_number,
          support_email: store.support_email,
          domain: store.domain.toLowerCase(),
        },
        { where: { id: user.storeId } }
      );
    } else {
      // new store
      await Store.create(
        {
          name: store.name,
          description: store.description,
          category: store.category,
          store_policy: store.store_policy,
          primary_contact_number: store.primary_contact_number,
          secondary_contact_number: store.secondary_contact_number,
          support_email: store.support_email,
          domain: store.domain,
        },
        { raw: true, returning: true }
      ).then((result) => {
        //add store id to user obj
        User.update({ storeId: result.id }, { where: { id: userId } });
        StoreIdentity.create({ storeId: result.id }, { raw: true });
      });
    }

    res.json({ case: 0, message: "Store created/ updated!" });
  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};

function isValid(req) {
  const expectedBody = Joi.object()
    .required()
    .keys({
      id: Joi.number().optional(),
      name: Joi.string().required(),
      description: Joi.string().allow(null, ""),
      category: Joi.number().required(),
      store_policy: Joi.string().allow(null, ""),
      primary_contact_number: Joi.number().allow(null),
      secondary_contact_number: Joi.number().allow(null),
      support_email: Joi.string().email().allow(null),
      createdAt: Joi.string().allow(null),
      updatedAt: Joi.string().allow(null),
      storeLogoUrl: Joi.string().allow(null),
      domain: Joi.string().allow(null),
    });
  const error = Joi.validateAndConvert({
    object: req,
    property: "body",
    expectedObject: expectedBody,
  }).error;
  if (error) return error;
  else return true;
}
