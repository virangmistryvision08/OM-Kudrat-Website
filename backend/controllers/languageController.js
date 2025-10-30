const Language = require("../models/languageModel");

const create_language = async (req, res) => {
  try {
    const { languageName } = req.body;
    await Language.create({ languageName });
    return res
      .status(201)
      .json({ status: true, message: "Language Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_language,
};
