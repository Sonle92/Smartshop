
const { validateSchema, categorySchema } = require("./schemas.yup.js");
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', validateSchema(categorySchema), categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
