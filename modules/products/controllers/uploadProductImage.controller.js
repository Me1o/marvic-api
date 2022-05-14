const Joi = require('marvic-api/helpers/joi');
const { Op } = require('sequelize');
const { models: { Store, User, Product} } = require('marvic-api/helpers/models');
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
   
      let file = req.file;
      //size check
      if(file.size > 1000000){
        res.json({ case: 0, message: 'file is too big, use images less than 1mb.' });
      }
      else if(file.mimetype != 'image/png' &&  file.mimetype != 'image/jpeg'){
        res.json({ case: 0, message: 'only PNGs and JPEGs are supported.' });
      }
      else{
        let index = req.query.index;
        let productId = req.query.productId;
        let userId = req.user.dataValues.id;
        const product = await Product.findOne({ where: { id: productId }, attributes: ['storeId'], raw: true });
        const user = await User.findOne({ where: { id: userId }, attributes: ['storeId'], raw: true });
        if(product.storeId == user.storeId){
          const path = req.file.path;
          const result = await cloudinary.uploader.upload(path, { public_id: `products/${user.storeId}/${product.id}/${index}`, tags: `product image` });
          if(index == 1)
             await Product.update({ img1: result.secure_url }, { where: { id: productId } });
          if(index == 2)
             await Product.update({ img2: result.secure_url }, { where: { id: productId } }); 
          if(index == 3)
             await Product.update({ img3: result.secure_url }, { where: { id: productId } });      
          res.json({ case: 0, message: result.secure_url });
        }
      }  
  } catch (err) {
    console.log(err);
    return res.json({ case: 0, message: 'Something went wrong!', err });
  }


};

function isValid(req){
  const expectedBody = Joi.object().required().keys({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    description:  Joi.string().allow(null, ''),
    category:  Joi.number().required(),
    store_policy:  Joi.string().allow(null, ''),
    primary_contact_number:  Joi.number().allow(null),
    secondary_contact_number:  Joi.number().allow(null),
    support_email:  Joi.string().email().allow(null),
    createdAt:  Joi.string().allow(null),
    updatedAt:  Joi.string().allow(null),
  });
  const error = Joi.validateAndConvert({ object: req, property: 'body', expectedObject: expectedBody }).error;
  if (error) 
    return error;
  else
    return true;
}



