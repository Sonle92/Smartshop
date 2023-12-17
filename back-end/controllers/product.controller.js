const Product = require("../MongoDb/model/Product");

const { StatusCodes } = require("http-status-codes");
// Lấy danh sách sản phẩm
exports.getProducts = async (req, res, next) => {
  try {
    Product.find()
      .populate("category")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
// them update ton kho
exports.updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // Lấy productId và quantity từ request body
    // Tìm sản phẩm trong cơ sở dữ liệu dựa trên productId
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found." });
    }

    if (product.stock < quantity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Insufficient stock." });
    }

    // Giảm số lượng tồn kho và lưu lại vào cơ sở dữ liệu
    product.stock -= quantity;
    await product.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Stock updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update inventory." });
  }
};
module.exports = exports;
