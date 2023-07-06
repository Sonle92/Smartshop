const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getCustomers);
router.post("/", customerController.createCustomer);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
