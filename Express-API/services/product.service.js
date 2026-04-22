const productModel = require("../models/product.model");

// create product
module.exports.createProduct = async ({
  name,
  description,
  stock,
  price,
  discount,
  isNewProduct,
  sku,
  images,
  brand,
  category,
}) => {
  if (
    !name ||
    !description ||
    !stock ||
    !price ||
    !sku ||
    !images ||
    !brand ||
    !category
  ) {
    throw new Error("All Fields Are Required !");
  }

  let product = await productModel.create({
    name,
    description,
    stock,
    price,
    discount,
    isNewProduct,
    sku,
    images,
    brand,
    category,
  });

  return product;
};

// single product
module.exports.singleProduct = async (id) => {
  const product = await productModel.findOne({ _id: id });

  return product;
};

// all products
module.exports.AllProducts = async () => {
  return await productModel.find();
};

// update product
module.exports.updateProduct = async (
  productid,
  name,
  description,
  stock,
  price,
  discount,
  isNewProduct,
  sku,
  images,
  brand,
  category,
) => {
  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: productid },
    {
      name,
      description,
      stock,
      price,
      discount,
      isNewProduct,
      sku,
      images,
      brand,
      category,
    },
    { new: true },
  );

  if (!updatedProduct) {
    throw new Error("Product Not Found !");
  }

  return updatedProduct;
};

// delete product
module.exports.deleteProduct = async (id) => {
  return await productModel.findOneAndDelete({ _id: id });
  }