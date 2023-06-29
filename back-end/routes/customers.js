var express = require("express");
var router = express.Router();
const yup = require("yup");
const { Customer } = require('../MongoDb/model');
const COLLECTION_NAME = "customers";
//Lay du lieu
router.get("/", async (req, res) => {
  try {
    Customer.find()
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
router.post("/",  async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Customer(data);
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
//sửa
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    Customer.findByIdAndUpdate(id, data, {
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
    Customer.findByIdAndDelete(id)
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