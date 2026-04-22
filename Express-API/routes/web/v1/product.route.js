// product creation
// product read single and all
// product update
// product delete

const express = require("express");
const router = express.Router();
const usermiddleware = require("../../../middlewares/user.middleware");
const adminmiddleware = require("../../../middlewares/admin.middleware");
const productController = require("../../../controllers/product.controller");

// create product
router.post(
  "/add",
  usermiddleware.authUser,
  adminmiddleware.authAdmin,
  productController.createProduct,
);
// authUser --> check user is login or not? ==> if login then --> req.user (give you back)
// authAdmin ==> req.user ==> check role ==> Admin or not? --> jump to next router

// single product
router.get(
  "/:id",
  usermiddleware.authUser,
  adminmiddleware.authAdmin,
  productController.singleProduct,
);

// all products
router.get(
  "/all",
  usermiddleware.authUser,
  adminmiddleware.authAdmin,
  productController.AllProducts,
);

// update product
router.put(
  "/:id",
  usermiddleware.authUser,
  adminmiddleware.authAdmin,
  productController.updateProduct,
);

// delete product
router.delete(
  "/:id",
  usermiddleware.authUser,
  adminmiddleware.authAdmin,
  productController.deleteProduct,
);

module.exports = router;
