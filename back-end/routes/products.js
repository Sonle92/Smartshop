var express = require("express");
var router = express.Router();
const yup = require("yup");
const {findDocuments } = require('../helper/MongoDb');
const Models = require("../MongoDb/model");
var { validateSchema, productSchema } = require("./schemas.yup");
const {Product} = require('../MongoDb/model')
const COLLECTION_NAME = "products";
router.get("/", async (req, res, next) => {
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
});


router.get("/:id", async (req, res, next) => {
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
});
// Thêm Mới dữ liệu
router.post("/",validateSchema(productSchema), async (req, res, next) => {
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
});

router.get("/find/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await Models.Product.find().byName(name);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: { name: err.name, messgae: err.message } });
  }
});


router.patch("/:id", async (req, res, next) => {
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
});
// XÓA
router.delete("/:id", async (req, res, next) => {
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
});
module.exports = router;
