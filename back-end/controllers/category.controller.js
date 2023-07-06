const Category = require("../MongoDb/model/Category");
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Category(data);
    const result = await newItem.save();
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = exports;