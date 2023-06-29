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


module.exports = router;