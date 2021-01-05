const Razorpay = require("razorpay");
const shortid = require("shortid");
var instance = new Razorpay({
  key_id: "rzp_test_fFhVXzu4VxWtSr",
  key_secret: "NSqUOkxHzL03EWh9r9r8LO5e"
});

let createCustomer = async (req, res) => {
  try {
    const { name, email, contact, notes } = req.body;
    const result = await instance.customers.create({
      name,
      email,
      contact,
      notes
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let editCustomer = async (req, res) => {
  try {
    const { customer_id, name, email, contact, notes } = req.body;
    const result = await instance.customers.edit(customer_id, {
      name,
      email,
      contact,
      notes
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await instance.customers.fetch(customer_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchAllToken = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await instance.customers.fetchTokens(customer_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

module.exports = {
  createCustomer,
  editCustomer,
  fetchCustomer,
  fetchAllToken
};
