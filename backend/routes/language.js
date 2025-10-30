const express = require("express");
const { create_language } = require("../controllers/languageController");
const routes = express.Router();

routes.post("/create-language", create_language);

module.exports = routes;