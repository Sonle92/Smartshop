const Customer = require('../MongoDb/model/Customer');

// Controller function: Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Controller function: Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const data = req.body;
    const newCustomer = new Customer(data);
    const result = await newCustomer.save();
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Controller function: Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Customer.findByIdAndUpdate(id, data, { new: true });
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Controller function: Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndDelete(id);
    res.send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports = exports;