var express = require("express");
var router = express.Router();
const yup = require("yup");
const {
    insertDocument,
  updateDocument,
  findDocument,
  findDocuments,
  deleteDocument,
} =require('../helper/MongoDb')
const { Category } = require('../MongoDb/model');
const { validateSchema, categorySchema } = require("./schemas.yup.js");
const COLLECTION_NAME = "categories";
//Lay du lieu
router.get("/", async (req, res) => {
  try {
    Category.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});
// THÊM MỚI
router.post("/", validateSchema(categorySchema), async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Category(data);
    newItem
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// SỬA
router.patch("/:id", async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    Category.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});
//Xóa
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Category.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
     } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
