const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogName: String,
    blogImage: String,
    shortDescription: String,
    createdAt: { type: Date, default: Date.now },
    htmlContent: String,
    by: String
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
