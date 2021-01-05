const Razorpay = require("razorpay");
const shortid = require("shortid");
var instance = new Razorpay({
  key_id: "rzp_test_fFhVXzu4VxWtSr",
  key_secret: "NSqUOkxHzL03EWh9r9r8LO5e"
});

let createOrder = async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture
  };

  try {
    const response = await instance.orders.create(options);
    console.log(response);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const result = await instance.orders.fetch(order_id);
    res.status(200).json({
      result
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchAllOrder = async (req, res) => {
  try {
    const { from, to, count, skip, authorized, receipt } = req.query;
    const option = { from, to, count, skip, authorized, receipt };
    const result = await instance.orders.all(option);
    res.status(200).json({
      result
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchPaymentByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const result = await instance.orders.fetchPayments(order_id);
    res.status(200).json({
      result
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};
module.exports = {
  createOrder,
  fetchOrder,
  fetchAllOrder,
  fetchPaymentByOrderId
};
