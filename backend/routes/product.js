const express = require("express");
const { create_product, get_all_products, get_one_product, get_all_filtered_products, get_all_product, get_top_four_trending_products } = require("../controllers/productControllers");
const routes = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/products");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    })
})

routes.post("/create-product", upload.single("productImage"), create_product);
routes.get("/get-all-products", get_all_products);
routes.get("/get-filtered-products", get_all_filtered_products);
routes.get("/get-one-product/:id", get_one_product);
routes.get("/get-all-product", get_all_product);
routes.get("/get-top-four-trending-products", get_top_four_trending_products);

module.exports = routes;