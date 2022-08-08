const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { Product, User },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Product.Controllers
   * @method Product
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
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });

    let product = req.body;
    if (product.id) {
      let productSlug = generateSlug(product.name, "_");
      //update Product
      await Product.update(
        {
          name: product.name,
          description: product.description,
          storeId: user.storeId,
          categoryId: product.categoryId,
          cost: product.cost,
          price: product.price,
          quantity: product.quantity,
        },
        { where: { id: product.id } }
      );
    } else {
      // new Product
      let productSlug = generateSlug(product.name, "_");
      console.log({ productSlug });
      await Product.create(
        {
          name: product.name,
          description: product.description,
          storeId: user.storeId,
          categoryId: product.categoryId,
          cost: product.cost,
          price: product.price,
          quantity: product.quantity,
          slug: productSlug,
        },
        { raw: true, returning: true }
      );
    }

    res.json({ case: 0, message: "Product created/ updated!" });
  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};

function isValid(req) {
  const expectedBody = Joi.object()
    .required()
    .keys({
      id: Joi.number(),
      name: Joi.string().required(),
      description: Joi.string().allow(null, ""),
      categoryId: Joi.number().allow(null),
      storeId: Joi.number().allow(null),
      cost: Joi.number(),
      price: Joi.number(),
      quantity: Joi.number(),
      createdAt: Joi.string().allow(null),
      updatedAt: Joi.string().allow(null),
      img1: Joi.string().allow(null),
      img2: Joi.string().allow(null),
      img3: Joi.string().allow(null),
    });
  const error = Joi.validateAndConvert({
    object: req,
    property: "body",
    expectedObject: expectedBody,
  }).error;
  if (error) return error;
  else return true;
}

function generateSlug(name, separator = "-") {
  return name
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
