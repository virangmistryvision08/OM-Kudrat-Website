const express = require("express");
const { create_category } = require("../controllers/categoryController");
const routes = express.Router();

routes.post("/create-category", create_category);

module.exports = routes;