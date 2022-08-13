const Joi = require("marvic-api/helpers/joi");
const { Op } = require("sequelize");
const {
  models: { StoreIdentity, User },
} = require("marvic-api/helpers/models");

module.exports = async (req, res) => {
  /**
   * @memberof Store.Controllers
   * @method Store
   */
  try {
    let userId = req.user.dataValues.id;
    let user = await User.findOne({
      where: { id: userId },
      attributes: ["storeId"],
      raw: true,
    });

    let storeIdentity = req.body;
    const identity = await StoreIdentity.findOne({
      where: { storeId: user.storeId },
      raw: true,
    });

    if (user.storeId != null && identity) {
      //update store identity
      await StoreIdentity.update(
        {
          primaryColor: storeIdentity.primaryColor,
          secondaryColor: storeIdentity.secondaryColor,
          fontName: storeIdentity.fontName,
          fontFileUrl: storeIdentity.fontFileUrl,
        },
        { where: { storeId: user.storeId } }
      );
    } else {
      await StoreIdentity.create({
        storeId: user.storeId,
        primaryColor: storeIdentity.primaryColor,
        secondaryColor: storeIdentity.secondaryColor,
        fontName: storeIdentity.fontName,
        fontFileUrl: storeIdentity.fontFileUrl,
      });
    }

    res.json({ case: 0, message: "Store Identity updated!" });
  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: "Something went wrong!", err });
  }
};
