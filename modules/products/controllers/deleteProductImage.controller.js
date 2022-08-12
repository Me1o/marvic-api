const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { Store, User, Product },
} = require("marvic-api/helpers/models");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "DEV",
      },
    });
    let index = req.body.index;
    let productId = req.body.productId;
    if (!index) throw new Error("messing required index field");
    let userId = req.user.dataValues.id;
    const product = await Product.findOne({
      where: { id: productId },
      attributes: ["storeId", "id"],
      raw: true,
    });
    const user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });
    if (product.storeId == user.storeId) {
      let imagePublicId = `products/${user.storeId}/${product.id}/${index}`;
      const result = await cloudinary.uploader.destroy(imagePublicId, {
        resource_type: "image",
      });
      if (result.result == "ok") {
        await Product.update(
          { [`img${index}`]: "" },
          { where: { id: productId } }
        );
      }
      res.json({ case: 0, message: "image deleted" });
    }
  } catch (err) {
    return res.json({
      case: 0,
      message: "Something went wrong!",
      err: err.message ?? err,
    });
  }
};
