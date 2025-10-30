const express = require("express");
const routes = express.Router();
const multer = require("multer");
const path = require("path");
const { create_blog, get_all_blogs, top_three_latest_blogs, other_blogs, get_one_blog } = require("../controllers/blogControllers");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/blogs");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    })
})

routes.post("/create-blog", upload.single("blogImage"), create_blog);
routes.get("/get-all-blogs", get_all_blogs);
routes.get("/top-three-latest-blogs", top_three_latest_blogs);
routes.get("/other-blogs/:id", other_blogs);
routes.get("/get-one-blog/:id", get_one_blog);

module.exports = routes;