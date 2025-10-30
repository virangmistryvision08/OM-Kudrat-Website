const Category = require("../models/categoryModel");

const create_category = async (req, res) => {
  try {
    const {categoryName} = req.body;
    await Category.create({categoryName});
    return res
      .status(201)
      .json({ status: true, message: "Category Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
    create_category
}