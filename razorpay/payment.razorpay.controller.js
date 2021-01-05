const Razorpay = require("razorpay");
const shortid = require("shortid");
var instance = new Razorpay({
  key_id: "rzp_test_fFhVXzu4VxWtSr",
  key_secret: "NSqUOkxHzL03EWh9r9r8LO5e"
});

let capturePayment = async (req, res) => {
  try {
    const { payment_id, amount, currency } = req.body;
    const result = await instance.payments.capture(
      payment_id,
      amount,
      currency
    );
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

let fetchPaymentById = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const result = await instance.payments.fetch(payment_id);
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

let fetchPaymentByBT = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const result = await instance.payments.bankTransfer(payment_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      status: false,
      err: error,
      message: "something went wrong!"
    });
  }
};

let fetchAllPayments = async (req, res) => {
  try {
    const { from, to, count, skip } = req.query;
    const result = await instance.payments.all({ from, to, count, skip });
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
  capturePayment,
  fetchPaymentById,
  fetchPaymentByBT,
  fetchAllPayments
};
