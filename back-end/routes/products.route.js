const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Lấy danh sách sản phẩm
router.get("/", productController.getProducts);

// Lấy thông tin sản phẩm theo id
router.get("/:id", productController.getProductById);

// Thêm mới sản phẩm
router.post("/", productController.createProduct);

// Tìm sản phẩm theo tên
router.get("/find/:name", productController.findProductByName);

// Cập nhật thông tin sản phẩm
router.patch("/:id", productController.updateProduct);

// Update ton kho
router.patch("/update-inventory/:id", productController.updateInventory);

// Xóa sản phẩm
router.delete("/:id", productController.deleteProduct);

module.exports = router;
