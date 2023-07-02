const Product = require('../MongoDb/model/Product');

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res, next) => {
  try {
    Product.find()
      .populate('category')
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Lấy thông tin sản phẩm theo id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    Product.findById(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Thêm mới sản phẩm
exports.createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Product(data);
    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Tìm sản phẩm theo tên
exports.findProductByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await Product.find().byName(name);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, message: err.message } });
  }
};

// Cập nhật thông tin sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    Product.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
};
module.exports = exports;