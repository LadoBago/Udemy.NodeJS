const path = require("path");
const express = require("express");
const { check, body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/products", isAuth, adminController.getProducts);
router.get(
  "/add-product",
  (req, res, next) => {
    console.log("5- log log log log");
    next();
  },
  isAuth,
  adminController.getAddProduct
);
router.post(
  "/add-product",
  (req, res, next) => {
    console.log("5- log log log log");
    next();
  },
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isString().isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isString().isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
